import { Injectable, Inject } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { LocationClassService } from 'src/location-class/location-class.service';
import { EquipmentService } from 'src/equipment/equipment.service';
import { EquipmentClassService } from 'src/equipment-class/equipment-class.service';
import { PointService } from 'src/point/point.service';
import { PointClassService } from 'src/point-class/point-class.service';
import { DeviceService } from 'src/device/device.service';
import { BrickGraph, BrickNode } from '../brick-graph';
import * as _ from "lodash";
import { ModelClass } from 'objection';
import { PointModel } from 'src/database/models/point.model';
import * as crypto from 'crypto';
import { DeviceModel } from 'src/database/models/device.model';
const secret = 'showmethecode';

@Injectable()
export class AutoAggregationService {
  constructor(
    private locationService: LocationService,
    private equipmentService: EquipmentService,
    private pointService: PointService,
    private deviceService: DeviceService,
  ) { }

  async init() {
    const locations = await this.locationService.findAll({});
    const equipments = await this.equipmentService.findAll({});
    const points = await this.pointService.findAll({});
    let G = new BrickGraph(locations, equipments, points, this.pointService, this.deviceService);
    await G.dfs(this.aggregate)
  }

  async aggregate(G: BrickGraph, node: BrickNode) {
    // ignore points
    if (AutoAggregationService.isPoint(G, node.id)) {
      return;
    }
    let adjacencies = node.adjacencies.map(v => G.nodes[v])
    // console.log("ID: " + node.id);
    let nodeAggregates = {};
    // Group adjacencies by class id
    adjacencies = _.groupBy(adjacencies, 'classId');
    // Iterate over each group
    for (let childClass in adjacencies) {
      // create a list of points for each element in this group
      let points = adjacencies[childClass].map((node) => {
        return node.adjacencies.map((id) => {
          return { id: id, classId: AutoAggregationService.getClass(G, id) };
        }).filter(p => AutoAggregationService.isPoint(G, p.id));
      })
      // Find point classes that are attached to each element in the group
      let intersection = _.intersectionBy(...points, 'classId');
      let aggregate = [];
      // For each such point class, accumulate the list of point ids corresponding to the elements in this group
      for (let i of intersection) {
        let classId = i.classId;
        let agg = _.reduce(points, (acc, x) => {
          return _.union(acc, x.filter(p => p.classId === classId).map(p => p.id))
        }, [])
        aggregate.push({ classId: classId, points: agg });
      }
      // If aggregate points exist, add them to the aggregate list for this node
      nodeAggregates[childClass] = aggregate;

    }
    // console.log(..._.values(nodeAggregates));
    // Find point classes that cover all children of this node
    let intersection = _.intersectionBy(..._.values(nodeAggregates), 'classId');
    nodeAggregates["TOTAL"] = [];
    // For each such point class, accumulate the list of point ids corresponding to each childClass group
    for (let i of intersection) {
      let classId = i.classId;
      let agg = _.reduce(_.values(nodeAggregates), (acc, x) => {
        return _.union(acc, x.filter(p => p.classId === classId).map(p => p.points))
      }, [])
      agg = _.flatten(agg);
      // Push the list of point ids and class to an TOTAL aggregate field for this node
      nodeAggregates["TOTAL"].push({ classId: classId, points: agg });
    }
    // console.log(JSON.stringify(nodeAggregates, null, 2));
    // Create points for each aggregate


    for (let childClass in nodeAggregates) {
      // Get list of aggregates per child class
      const agg = nodeAggregates[childClass];
      for (let p of agg) {
        const aggregateList = p.points.map(point => AutoAggregationService.getModelId(point));
        let aggPoint = await G.pointService.findOne('meta', "LIKE", `%${crypto.createHmac('sha1', secret)
          .update(aggregateList.sort().toString())
          .digest('hex')}%`);
        if (!aggPoint) {
          aggPoint = await G.pointService.create({
            classId: AutoAggregationService.getPointClass(p.classId),
            locationId: (node.type === 'LocationModel') ? AutoAggregationService.getModelId(node.id) : null,
            equipmentId: (node.type === 'EquipmentModel') ? AutoAggregationService.getModelId(node.id) : null,
            name: AutoAggregationService.getNameFromClassPath(childClass + "/" + p.classId),
            meta: {
              generated: true,
              aggregates: aggregateList,
              classPath: childClass + "/" + p.classId,
              aggregateHash: crypto.createHmac('sha1', secret)
                .update(aggregateList.sort().toString())
                .digest('hex')
            }
          });
          // Create links for generated point
          switch (node.type) {
            case 'LocationModel': {
              await G.pointService.addPointOfLocation(aggPoint.id, AutoAggregationService.getModelId(node.id));
              break;
            }
            case 'EquipmentModel': {
              await G.pointService.addPointOfEquipment(aggPoint.id, AutoAggregationService.getModelId(node.id));
              break;
            }
          }
          // If we are creating a new point, then we need to associate with the correct device
          // Find the devices related to the points that we are aggregating
          const devices = await G.deviceService.deviceModelClass.query()
            .joinRelated('points')
            .whereIn('points.id', aggregateList);
          const deviceGroups = _.groupBy(devices, 'classId');
          for (let deviceClass in deviceGroups) {
            let devicesToAggregate = deviceGroups[deviceClass];
            if (devicesToAggregate.length === 1) {
              // If there is only one device to aggregate, just associate it with the generated point and continue
              await G.deviceService.addPoint(devicesToAggregate[0].id, aggPoint.id);
              continue;
            }
            // Otherwise try to find a device that aggregates this group of devices
            const hash = crypto.createHmac('sha1', secret)
              .update(devicesToAggregate.sort().toString())
              .digest('hex')
            devicesToAggregate = devicesToAggregate.map(device => device.serial);

            let aggDevice = await G.deviceService.deviceModelClass.query()
              .findOne('meta', "LIKE", `%${hash}%`);
            if (aggDevice) {
              await G.deviceService.addPoint(aggDevice.id, aggPoint.id);
              continue;
            }

            for (let aggregatorService of ['SPARK', 'FOGMR']) {
              // Otherwise create a new aggregate device
              aggDevice = await G.deviceService.create({
                classId: `AGGREGATOR.${aggregatorService}.${AutoAggregationService.getDeviceClass(deviceClass)}`,
                locationId: aggPoint.locationId,
                serial: `${aggregatorService.toLowerCase()}-${hash}`,
                meta: {
                  generated: true,
                  aggregates: devicesToAggregate,
                  aggregateHash: hash
                }
              });
              // ... and associate it with the point
              await G.deviceService.addPoint(aggDevice.id, aggPoint.id);
            }

          }
        }

        // Insert point and adjacency into Graph so that DFS can continue
        let aggPointNode = new BrickNode(aggPoint);
        aggPointNode.classId = childClass + "/" + p.classId;
        G.nodes[aggPointNode.id] = aggPointNode;
        // console.log(aggPointNode);
        // Add aggregate point node to adjacency of node
        G.nodes[node.id].adjacencies.push(aggPointNode.id);

      }

    }

  }

  static getClass(G: BrickGraph, id: string): string {
    return G.nodes[id].classId;
  }
  static isPoint(G: BrickGraph, id: string): boolean {
    return G.nodes[id].classId.includes("PointModel");
  }
  static getModelId(id: string): number {
    return +(id.substr(2));
  }
  static getPointClass(classId: string): string {
    return classId.substr(classId.indexOf("PointModel") + 11);
  }
  static getDeviceClass(classId: string): string {
    if (classId.startsWith("AGGREGATOR")) {
      return _.join(classId.split('.').splice(2), ".");
    }
    return classId;
  }
  static getNameFromClassPath(classPath: string) {
    let parts = classPath.split("/");
    parts = parts.map(part => _.last(part.split(".")))
    return _.join(_.uniq(parts), " ");
  }

  async test() {
    // const point = await this.pointModelClass.query().findOne('meta', "LIKE",  '%aggregates: [721,724]%')
    // const point = await this.pointService.findOne('meta', "LIKE", `%${crypto.createHmac('sha1', secret)
    //   .update([754, 757].sort().toString())
    //   .digest('hex')}%`)
    const devices = await this.deviceService.deviceModelClass.query()
      .joinRelated('points')
      .whereIn('points.id', [714, 10]);

    console.log(devices)
  }
}
