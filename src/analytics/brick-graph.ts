import { EquipmentModel } from "src/database/models/equipment.model";
import { PointModel } from "src/database/models/point.model";
import { LocationModel } from "src/database/models/location.model";
import * as _ from "lodash";

export class BrickNode {
  id: number | string;
  meta: object;
  name: string;
  type: string;
  classId: string;
  adjacencies?: string[];
  constructor(n: (LocationModel | EquipmentModel | PointModel)) {
    this.id = n.id;
    this.name = n.name;
    this.type = n.constructor.name;
    this.meta = n.meta;
    this.classId = `${this.type}.${n.classId}`;
    this.adjacencies = [];
  }
}

export class BrickGraph {
  nodes = {};
  roots: string[] = [];
  constructor(locations: LocationModel[], equipments: EquipmentModel[], points: PointModel[]) {
    // locations
    for (let l of locations) {
      this.nodes[`L-${l.id}`] = new BrickNode(l);
      this.roots.push(`L-${l.id}`);
    }
    for (let l of locations) {
      for (let c of l.children) {
        this.nodes[`L-${l.id}`].adjacencies.push(`L-${c.id}`);
        _.pull(this.roots, `L-${c.id}`);
      }
    }
    for (let e of equipments) {
      this.nodes[`E-${e.id}`] = new BrickNode(e);
      this.nodes[`L-${e.locationId}`].adjacencies.push(`E-${e.id}`);
    }
    for (let e of equipments) {
      for (let c of e.children) {
        this.nodes[`E-${e.id}`].adjacencies.push(`E-${c.id}`);
      }
    }
    for (let p of points) {
      this.nodes[`P-${p.id}`] = new BrickNode(p);
    }
    for(let p of points){
      for(let pol of p.pointOfLocations){
        this.nodes[`L-${pol.id}`].adjacencies.push(`P-${p.id}`);
      }

      for(let poe of p.pointOfEquipments){
        this.nodes[`E-${poe.id}`].adjacencies.push(`P-${p.id}`);
      }
    }
    console.log(this.nodes)
    console.log(this.roots);
  }
}
