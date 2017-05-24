import { Graph } from "./graph";

export class Algorithm {
  graph: Graph;
  id: string;

  static empty() {
    return new Algorithm({id: '', graph: Graph.empty()});
  }

  constructor({id, graph}: {id: string, graph: Graph}) {
    this.id = id;
    this.graph = graph;
  }

  withGraph(graph) {
    return new Algorithm({
      id: this.id,
      graph: graph
    });
  }
}
