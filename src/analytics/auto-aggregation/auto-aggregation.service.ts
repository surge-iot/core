import { Injectable } from '@nestjs/common';
import { LocationService } from 'src/location/location.service';
import { LocationClassService } from 'src/location-class/location-class.service';
import { EquipmentService } from 'src/equipment/equipment.service';
import { EquipmentClassService } from 'src/equipment-class/equipment-class.service';
import { PointService } from 'src/point/point.service';
import { PointClassService } from 'src/point-class/point-class.service';
import { DeviceService } from 'src/device/device.service';
import { BrickGraph, BrickNode } from '../brick-graph';
import * as _ from "lodash";

@Injectable()
export class AutoAggregationService {
  constructor(
    private locationService: LocationService,
    private equipmentService: EquipmentService,
    private pointService: PointService,
    private deviceService: DeviceService
  ) { }

  async init() {
    const locations = await this.locationService.findAll({});
    const equipments = await this.equipmentService.findAll({});
    const points = await this.pointService.findAll({});
    let G = new BrickGraph(locations, equipments, points);
    G.dfs(this.aggregate)
  }

  async aggregate(G: BrickGraph, node: BrickNode) {
    // ignore points
    if (node.type === 'PointModel') {
      return;
    }
    let adjacencies = node.adjacencies.map(v => G.nodes[v])
    console.log("ID: " + node.id);

    // Group adjacencies by class id
    adjacencies = _.groupBy(adjacencies, 'classId');
    // Iterate of each group
    for (let childClass in adjacencies) {
      // find point class that covers all elements of this group
      let points = adjacencies[childClass].map((node) => {
        return node.adjacencies.map((id) => {
          return { id: id, classId: AutoAggregationService.getClass(G, id) };
        });
      })
      // console.log(points)
      console.log(childClass)
      // console.log(points)
      let intersection = _.intersectionBy(...points, 'classId');
      // console.log(intersection);
      let aggregate =[];
      for(let i of intersection){
        let classId = i.classId;
        let agg = _.reduce(points, (acc,x)=>{
          return _.union(acc,x.filter(p=>p.classId === classId).map(p=>p.id))
        }, [])
        aggregate.push({classId: classId, points:agg});
      }
      console.log(aggregate);
    }
  }

  static getClass(G: BrickGraph, id: string): string {
    return G.nodes[id].classId;
  }
  isPoint(G: BrickGraph, id: string): boolean {
    return _.startsWith(G.nodes[id].classId, "PointModel");
  }
}
