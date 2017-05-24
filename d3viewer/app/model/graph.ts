import { List, Set, Seq, Iterable } from 'immutable';

export class Node {
  key: string
  category: string
  isGroup?: boolean
  group?: string
  text: string
  description: string[]
  calledGraphId?: string

  constructor(
      {key, category, isGroup, group, text, description, calledGraphId}:
      {key: string, category: string, isGroup?: boolean, group?: string, text: string, description: string[], calledGraphId: string | null}
    ) {
    this.key = key;
    this.category = category;
    this.isGroup = isGroup;
    this.group = group;
    this.text = text;
    this.description = description;
    if (typeof calledGraphId === 'string') this.calledGraphId = calledGraphId;
  }
}

export class Link {
  from: string;
  to: string;

  constructor({from, to}: {from: string, to: string}) {
    this.from = from;
    this.to = to;
  }
}

export class Graph {
  private _nodes: List<Node> = List<Node>()
  private _links: List<Link> = List<Link>()

  static empty() {
    return new Graph({nodes: [], links: []});
  }

  constructor({nodes, links}: {nodes: Node[] | Iterable<number, Node>, links: Link[] | Iterable<number, Link>}) {
    this._nodes = List<Node>(nodes);
    this._links = List<Link>(links);
  }

  with({nodes, links}) {
    return new Graph({
      nodes: this._nodes.merge(nodes || []),
      links: this._links.merge(links || [])
    });
  }

  without({nodes, links}) {
    return new Graph({
      nodes: this._nodes.filterNot(makePredicate(nodes)),
      links: this._links.filterNot(makePredicate(links))
    })
  }

  links() : Seq.Indexed<Link> {
    return this._links.toSeq();
  }

  nodes() : Seq.Indexed<Node> {
    return this._nodes.toSeq();
  }
}

function makePredicate(filter) {
  if (typeof filter === 'function') return filter;
  const set = Set(filter);
  return function (arg) {
    return set.contains(arg);
  }
}
