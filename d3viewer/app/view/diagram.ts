import { Graph, Node, Link } from "../model/graph";
import * as Immutable from "immutable";
import * as d3 from "d3"
import "d3-force";
import "d3-selection";
import * as $ from "jquery";

class D3Node {
  x: number;
  y: number;
  node: Node;

  constructor(node: Node) {
    this.node = node;
  }

  get key() {
    return this.node.key;
  }

  get text() {
    return this.node.text;
  }

  get title() {
    return this.node.description.join('\n');
  }
}

class D3Link {
  link: Link;
  source: D3Node;
  target: D3Node;

  constructor(link: Link, graph: D3Graph) {
    this.link = link;
    this.source = graph.node(link.from);
    this.target = graph.node(link.to);
  }
}

class D3Graph {
  private _nodesByKey: Immutable.Map<string, D3Node>;
  nodes: D3Node[];
  links: D3Link[];

  constructor(graph: Graph) {
    this._nodesByKey = Immutable.Map<string, D3Node>(graph.nodes().toArray().map(n => [n.key, new D3Node(n)]));
    this.nodes = this._nodesByKey.valueSeq().toArray();
    this.links = graph.links().toArray().map(l => new D3Link(l, this));
  }

  node(key) {
    const node = this._nodesByKey.get(key);
    if (!node) throw 'No node found for key ' + key;
    return node;
  }
}

export default class Diagram {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  render(graph: Graph) {
    var d3Graph = new D3Graph(graph);

    var svg = d3.select("#" + this.id)
      .attr("width", "100%")
      .attr("height", "100%");

    // TODO: resize the forcecenter correctly
    let chartWidth = $("#" + this.id).width();
    let chartHeight = $("#" + this.id).height();

    const forceLink = d3.forceLink<D3Node, D3Link>().id(function (d) { return d.key; });

    var simulation = d3.forceSimulation<D3Node>()
      .force("link", forceLink)
      .force("collide", d3.forceCollide(function (d) { return 50; }).iterations(16))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0));

    svg.select(".links").remove();
    svg.select(".nodes").remove();

    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(d3Graph.links);

    link.exit().remove();

    const linkEnter = link.enter()
      .append("line")

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(d3Graph.nodes);

    node.exit().remove();

    const nodeEnter = node.enter()
      .append("g")
      .attr("class", "node")
      .call(<any>d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    nodeEnter.append("circle")
      .attr("r", "20px")

    nodeEnter.append("image")
      // .attr("class", "circle")
      .attr("xlink:href", d => iconForNode(d.node))
      .attr("x", "-16px")
      .attr("y", "-16px")
      .attr("width", "32px")
      .attr("height", "32px");

    nodeEnter.append("title")
      .text(function (d) { return d.text; });

    var ticked = function () {
      link.merge(linkEnter)
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });


      node.merge(nodeEnter)
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    simulation
      .nodes(d3Graph.nodes)
      .on("tick", ticked);

    forceLink
      .links(d3Graph.links);

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  onExpandGroup(callback: (graph, group) => void) {

  }
}

function iconForNode(node: Node) {
  return `assets/images/icons/${iocaTypeFromNode(node)}.png`;
}

const categoryToType = {
  OfCondition: 'cond',
  OfConditionAlt: 'condAlt',
  OfLoop: 'loop',
  OfActivity: 'act',
  OfInput: 'input',
  OfValue: 'input',
  OfOutput: 'output',
};

function iocaTypeFromNode(node: Node) {
  if (node.category == 'OfActivity' && node.isGroup) return 'algo';
  return categoryToType[node.category] || 'act';
}
