import * as $ from 'jquery';
import { loadFile } from "./filesystem";
import { Graph, Link, Node } from "../model/graph";
import { HttpDeepalgoComSchemasIocaJsonSchemaYml as RawJSONData } from "./json-data";

export interface IClient {
  /**
   * Load the whole graph for an algorithm.
   */
  graph(id: string): Promise<Graph>

  /**
   * Load a subgraph of the given group
   */
  expandedGraph(graph: Graph, group: Node): Promise<Graph>
}

class JSONFile {
  id: string;

  constructor(id) {
    this.id = id;
  }

  data(): Promise<RawJSONData> {
    var deferred = $.Deferred<RawJSONData>();
    var value = 'data/' + this.id + '.js';
    loadFile(
      value,
      function (data: RawJSONData) { deferred.resolve(data); },
      function () { deferred.reject('Loading error'); }
    );
    // FIXME: (jany) casting problem
    return <any> deferred.promise();
  }
}

class SimpleJSONData {
  data: RawJSONData;

  constructor (data: RawJSONData) {
    this.data = data;
  }

  nodes(): Array<Node> {
    if (!this.data.nodeList) return [];
    return this.data.nodeList.map(n => new Node(n));
  }

  links(): Array<Link> {
    if (!this.data.linkList) return [];
    const res: Link[] = [];
    this.data.linkList.forEach(l => {
      if (!(l.from.nodeIdInCurrentGraph && l.to.nodeIdInCurrentGraph)) return;
      res.push(new Link({
        from: l.from.nodeIdInCurrentGraph,
        to: l.to.nodeIdInCurrentGraph,
      }));
    });
    return res;
  }
}

class NestedJSONData {
  data: RawJSONData;

  constructor (graph: Graph, group: Node, data: RawJSONData) {
    this.data = data;
  }

  nodes(): Array<Node> {
    // TODO
    return [];
  }

  links() : Array<Link> {
    // TODO
    return [];
  }

  deprecatedLinks(): Array<Link> {
    // TODO
    return [];
  }
}

export class Client implements IClient {
  graph(id: string): Promise<Graph> {
    return new JSONFile(id).data().then(rawData => {
      const data = new SimpleJSONData(rawData);
      return new Graph({
        nodes: data.nodes(),
        links: data.links()
      });
    })
  }

  expandedGraph(graph: Graph, group: Node): Promise<Graph> {
    return new JSONFile(group.calledGraphId).data().then(rawData => {
      const data = new NestedJSONData(graph, group, rawData);
      return graph.without({
        nodes: [],
        links: data.deprecatedLinks(),
      }).with({
        nodes: data.nodes(),
        links: data.links()
      });
    });
  }
}
