
var ALL_LAYERS = [
  { key: '__input__', logoFilename: "images/input.png", text: 'Input' , isGroup:true, category:"layer"},
  { key: '__action__', logoFilename: "images/act.png", text: 'Algorithm', isGroup:true, category:"layer" },
    { key: '__output__', logoFilename: "images/output.png", text: 'Output', isGroup:true, category:"layer"}
];
var LAYER_KEYS = {};

var LAYER_SPACING = 100;
var GAP_BETWEEN_LAYERS = 10;

function DataflowLayout () {
  go.LayeredDigraphLayout.call(this);
  this.layerSpacing = LAYER_SPACING;
  this.columnSpacing = DataFlowMargins.layoutColumnSpacing;
}
go.Diagram.inherit(DataflowLayout, go.LayeredDigraphLayout);


function node_to_layer(node){
  return 'action';
}

DataflowLayout.prototype.addColumnsToModel = function(diagram,model) {
  
  for(var i=0; i< ALL_LAYERS.length; i++){
    LAYER_KEYS[ALL_LAYERS[i].key] = ALL_LAYERS[i].key;
    model.addNodeData(ALL_LAYERS[i]);
  }  
};

DataflowLayout.prototype.moveIntoLayers = function(diagram,model) {
  for(var i=0; i < model.nodeDataArray.length;i++){
    var nodeData = model.nodeDataArray[i];
    if(nodeData.category != 'layer' && nodeData.group == null){
      var node = diagram.findNodeForKey(nodeData.key);
      if(node){
	var links = node.findLinksInto();
	if(links.count == 0 && !nodeData.isGroup  && nodeData.category == 'OfInput'){
	  model.setGroupKeyForNodeData(nodeData, '__input__');
	  continue;
	}
	links = node.findLinksOutOf();
	if(links.count == 0 && !nodeData.isGroup && nodeData.category == 'OfOutput'){
	  model.setGroupKeyForNodeData(nodeData, '__output__');
	  continue;
	}
	model.setGroupKeyForNodeData(nodeData, '__action__');
      }
    }
  }
}

DataflowLayout.findDataLayer = function(diagram,nodeData){
  var node = diagram.findNodeForKey(nodeData.key);
  if(node){
    return DataflowLayout.findLayer(diagram,node);
  }
  return null;
};

DataflowLayout.findLayer = function(diagram,node){
  var layer = LAYER_KEYS[node.data.group];
  if(layer) return layer;
  while(!layer){
    if(!node.data.group) return null;
    node = diagram.findNodeForKey(node.data.group);
    if(!node) return null;
    layer = LAYER_KEYS[node.data.group];
  }
  return layer;
};

DataflowLayout.findMovableNode = function(diagram,node){
  var layer = LAYER_KEYS[node.data.group];
  if(layer) return node;
  while(!layer){
    if(!node.data.group) return null;
    node = diagram.findNodeForKey(node.data.group);
    if(!node) return null;
    layer = LAYER_KEYS[node.data.group];
  }
  return node;
};

DataflowLayout.moveNodeToLayer = function(diagram,node,layer){
  var movableNode = DataflowLayout.findMovableNode(diagram,node);
  
  diagram.model.setGroupKeyForNodeData(movableNode.data,layer);
  return movableNode;

};

DataflowLayout.moveAdjNodesToLayer = function(diagram,node){
  var target_layer = DataflowLayout.findLayer(diagram,node);
  if(target_layer == null){return;}
  if(target_layer == '__input__'){
    node.findLinksOutOf(null).each(function(l){      
      DataflowLayout.moveNodeToLayer(diagram,l.toNode,target_layer);
    });
  }
  if(target_layer == '__output__'){
    node.findLinksInto(null).each(function(l){      
      DataflowLayout.moveNodeToLayer(diagram,l.fromNode,target_layer);
    });
  }
  diagram.layoutDiagram(true);
};
