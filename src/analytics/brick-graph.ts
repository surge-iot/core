import { EquipmentModel } from "src/database/models/equipment.model";
import { PointModel } from "src/database/models/point.model";
import { LocationModel } from "src/database/models/location.model";
import * as _ from "lodash";
import { PointService } from "src/point/point.service";

export class BrickNode {
  id: string;
  meta: object;
  name: string;
  type: string;
  classId: string;
  adjacencies?: string[];
  constructor(n: (LocationModel | EquipmentModel | PointModel)) {
    switch (n.constructor.name) {
      case "LocationModel": this.id = `L-${n.id}`; break;
      case "EquipmentModel": this.id = `E-${n.id}`; break;
      case "PointModel": this.id = `P-${n.id}`; break;
    }
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
  visited: string[] = [];
  pointService: PointService;
  constructor(locations: LocationModel[], equipments: EquipmentModel[], points: PointModel[], pointService) {
    this.pointService = pointService;
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
    for (let p of points) {
      for (let pol of p.pointOfLocations) {
        this.nodes[`L-${pol.id}`].adjacencies.push(`P-${p.id}`);
      }

      for (let poe of p.pointOfEquipments) {
        this.nodes[`E-${poe.id}`].adjacencies.push(`P-${p.id}`);
      }
    }
  }

  async dfs(fn: (G: BrickGraph, node: BrickNode) => void) {
    // Reset visited
    this.visited = [];

    // Add all root nodes to recursive call
    for (let n of this.roots) {
      await this._dfsNode(this.nodes[n], fn);
    }
  }

  private async  _dfsNode(node: BrickNode, fn: (G: BrickGraph, node: BrickNode) => void) {
    // check if already visited node
    if (_.includes(this.visited, node.id)) {
      return;
    }
    // run dfs on adjacencies
    for (let a of node.adjacencies) {
      await this._dfsNode(this.nodes[a], fn);
    }
    await fn(this, node);
    this.visited.push(node.id);
  }
}
