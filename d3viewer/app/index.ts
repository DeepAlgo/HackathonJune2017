import Selector from './view/selector';
import Diagram from './view/diagram';
import { Client } from "./client/client";
import { History } from './model/history';
import { Algorithm } from './model/algorithm';

// Model
const client = new Client();
const history = new History<Algorithm>(Algorithm.empty());

// View
const selector = new Selector('selector');
const diagram = new Diagram('diagram');

// Controller
selector.onGraphSelected((id) => {
  // Replace completely the model
  client.graph(id).then((graph) => {
    history.push(new Algorithm({id, graph}));
  });
});

diagram.onExpandGroup((graph, group) => {
  // Augment the model with the newly loaded graph
  client.expandedGraph(graph, group).then(graph => {
    history.push(history.current().withGraph(graph));
  })
})

history.onChange((algorithm) => {
  diagram.render(algorithm.graph);
})

