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
    if (AutoAggregationService.isPoint(G, node.id)) {
      return;
    }
    let adjacencies = node.adjacencies.map(v => G.nodes[v])
    console.log("ID: " + node.id);
    let nodeAggregates = {};
    // Group adjacencies by class id
    adjacencies = _.groupBy(adjacencies, 'classId');
    // Iterate over each group
    for (let childClass in adjacencies) {
      // create a list of points for each element in this group
      let points = adjacencies[childClass].map((node) => {
        return node.adjacencies.map((id) => {
          return { id: id, classId: AutoAggregationService.getClass(G, id) };
        }).filter(p=>AutoAggregationService.isPoint(G,p.id));
      })
      // Find point classes that are attached to each element in the group
      let intersection = _.intersectionBy(...points, 'classId');
      let aggregate =[];
      // For each such point class, accumulate the list of point ids corresponding to the elements in this group
      for(let i of intersection){
        let classId = i.classId;
        let agg = _.reduce(points, (acc,x)=>{
          return _.union(acc,x.filter(p=>p.classId === classId).map(p=>p.id))
        }, [])
        aggregate.push({classId: classId, points:agg});
      }
      // If aggregate points exist, add them to the aggregate list for this node
        nodeAggregates[childClass] = aggregate;
      
    }
    // console.log(..._.values(nodeAggregates));
    // Find point classes that cover all children of this node
    let intersection = _.intersectionBy(..._.values(nodeAggregates),'classId');
    nodeAggregates["ALL"]=[];
      // For each such point class, accumulate the list of point ids corresponding to each childClass group
    for(let i of intersection){
      let classId = i.classId;
      let agg = _.reduce(_.values(nodeAggregates), (acc,x)=>{
        return _.union(acc,x.filter(p=>p.classId === classId).map(p=>p.points))
      }, [])
      agg = _.flatten(agg);
      // Push the list of point ids and class to an ALL aggregate field for this node
      nodeAggregates["ALL"].push({classId: classId, points:agg});
    }
    console.log(JSON.stringify(nodeAggregates, null, 2));
    
  }

  static getClass(G: BrickGraph, id: string): string {
    return G.nodes[id].classId;
  }
  static isPoint(G: BrickGraph, id: string): boolean {
    return _.startsWith(G.nodes[id].classId, "PointModel");
  }
}
