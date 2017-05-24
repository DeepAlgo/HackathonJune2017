/* global
  CommonUI
  DataFlowColors
  DataFlowFonts
  DataFlowMargins
  DataFlowCollapsedSizes
  DataFlowToolTip
  DataFlowLink
  DataFlowSizes
  DataFlowStrokeSizes
  DataflowLayout
  go
  merge
*/

var DataflowDiagram = function(client) {
  var that = this;
  var $ = go.GraphObject.make;
  var globalDiagram;

  function layout() {
    return $(DataflowLayout, {
      isInitial: false,
      isOngoing: false,
      layerSpacing: DataFlowSizes.layerSpacing,
      setsPortSpots: false
    });
  }

  function diagramConfig() {
    return CommonUI.sharedDiagramConfig({
      'undoManager.isEnabled': false,
      initialAutoScale: go.Diagram.Uniform,
      initialContentAlignment: go.Spot.Center,
      layout: layout()
    });
  }

  function nodeConfig(special_conf, panelType) {
    return [(panelType || go.Panel.Auto), merge({
      mouseEnter: nodeMouseEnterHandler,
      mouseLeave: nodeMouseLeaveHandler,
      toSpot: go.Spot.Left,
      fromSpot: go.Spot.Right,
      selectionAdorned: false,
      locationSpot: go.Spot.TopLeft,
      click: nodeClickEventHandler
    }, special_conf)
    ];
  }

  function eachConnectedNodeAndLink(startNode, nodeCallback, linkCallback) {
    var node;
    var visited = new go.Set();
    var queue = [startNode];
    while ((node = queue.pop())) {
      if (visited.add(node) && nodeCallback) nodeCallback(node);
      node.findLinksOutOf(null).each(function(l) {
        if (visited.add(l) && linkCallback) linkCallback(l);
        if (l.toNode && !visited.has(l.toNode)) queue.push(l.toNode);
      });
    }
    queue = [startNode];
    while ((node = queue.pop())) {
      if (visited.add(node) && nodeCallback) nodeCallback(node);
      node.findLinksInto(null).each(function(l) {
        if (visited.add(l) && linkCallback) linkCallback(l);
        if (l.fromNode && !visited.has(l.fromNode)) queue.push(l.fromNode);
      });
    }
  }

  function textStyle() {
    return {
      stroke: DataFlowColors.text,
      margin: DataFlowMargins.nodeText,
      font: DataFlowFonts.node,
      width: DataFlowSizes.maxBoxWidth,
      wrap: go.TextBlock.WrapFit
    };
  }

  function textConfig(special_conf) {
    return [
      merge(textStyle(), special_conf),
      new go.Binding('text', 'text'),
      new go.Binding('stroke', '', function(data) {
        if (data.isFaded && !data.isHighlighted && !data.isPinned) {
          return DataFlowColors.textLight;
        }
        return DataFlowColors.text;
      })
    ];
  }

  function linkConfig(special_conf) {
    return [
      merge({
        selectionAdorned: false
      }, special_conf),
      new go.Binding('layerName', 'isHighlighted', function(h) {
        return h ? 'Foreground' : 'Background';
      }).ofObject(),
      new go.Binding('isHighlighted', 'isHighlighted').makeTwoWay()
    ];
  }

  function groupConfig(special_conf) {
    return [go.Panel.Auto, merge({
        mouseEnter: nodeMouseEnterHandler,
        mouseLeave: nodeMouseLeaveHandler,
        fromSpot: go.Spot.Right,
        toSpot: go.Spot.Left,
        locationSpot: go.Spot.TopLeft,
        selectionAdorned: false,
        layout: layout(),
      }, special_conf),
      visibleBinding(),
      new go.Binding('isSubGraphExpanded', 'isSubGraphExpanded').makeTwoWay(),
      new go.Binding('isHighlighted', 'isHighlighted').makeTwoWay()
    ];
  }


  function layerConfig(special_conf) {
    return [go.Panel.Auto,
      merge({
        selectionAdorned: false,
        layout: layout(),
      }, special_conf)
    ];
  }

  function linkShapeConfig(special_conf) {
    return [
      merge({
        strokeWidth: DataFlowStrokeSizes.link
      }, special_conf)
    ].concat([linkAndOuterStrokeBinding()]);
  }

  function linkAndOuterStrokeBinding() {
    return [
      new go.Binding('stroke', '', function(data) {
        // WARNING: binding on the whole object is costly
        if (data.isHighlighted || data.isPinned) {
          return DataFlowColors.linkAccent;
        }
        return data.isFaded ? DataFlowColors.linkLight : DataFlowColors.link;
      })
    ];
  }

  function layerBinding() {
    return new go.Binding('scale', '', function(data) {
      var layer = DataflowLayout.findDataLayer(globalDiagram, data);
      if (layer == '__input__' || layer == '__output__') {
        return 10.0;
      } else {
        return 1.0;
      }
    });
  }

  function expandCollapseGroup(group) {
    startTransaction('expandCollapseGroup');
    if (group.isSubGraphExpanded) {
      //collapseGroup(group);
      group.isSubGraphExpanded = false;
      commitTransaction('expandCollapseGroup');
    } else {
      //expandGroup(group);
      group.isSubGraphExpanded = true;
      commitTransaction('expandCollapseGroup');
    }
    //startTransaction('startExpandCollaps');
    globalDiagram.layoutDiagram(true);
    //commitTransaction('startExpandCollaps');
  }


  /**
   * Goal: remove edges that are redundant.
   *
   * FIXME: (jany) This is my naive implementation.
   * TODO: (jany) Look at a real algo, like http://www.cs.ucr.edu/~neal/Khuller94Approximating.pdf
   */
  this.simplifyEdges = function() {
    var linkDataToRemove = [];
    globalDiagram.nodes.each(function(node) {
      node.findLinksOutOf(null).each(function(link) {
        if (isRedundant(link)) linkDataToRemove.push(link.data);
      });
    });
    globalDiagram.model.removeLinkDataCollection(linkDataToRemove);
  }

  /**
   * Check whether we can reach this link's `toNode` from its `fromNode` without
   * using the link itself (thus proving that the link is redundant).
   *
   * @param  {go.Link} link
   * @return {Boolean}
   */
  function isRedundant(link) {
    var visited = new go.Set();
    var queue = [link.fromNode];
    var node;
    while ((node = queue.pop())) {
      if (!visited.add(node)) continue;
      if (node == link.toNode) return true;
      node.findLinksOutOf(null).each(function(l) {
        // Skip the link that we're testing
        if (l == link) return;
        if (l.toNode && !visited.has(l.toNode)) queue.push(l.toNode);
      });
    }
    return false;
  }

  function visibleBinding() {
    return new go.Binding('visible', 'visible');
  }

  /**
   * @param  {string} iocaType
   * @param  {int} layer
   * @param  {string} [size=full] Give 'small' for a contracted shape
   * @param  {object} [specialConf={}]
   * @return {Array<Object, go.Binding}
   */
  function iocaShapeConfig(iocaType, layer, size, specialConf) {
    if (!size) size = 'full';
    var conf = {
      fill: DataFlowColors.fill,
      strokeJoin: 'round',
      strokeWidth: DataFlowStrokeSizes.innerBorder,
      parameter1: 0, // inner border
    };
    if (layer === 1) {
      conf = merge(conf, {
        parameter1: 1, // Activate outer border
        strokeWidth: DataFlowStrokeSizes.innerBorder + DataFlowStrokeSizes.outerBorder,
        portId: '', // This shape is where links attach
        fromSpot: go.Spot.Right,
        toSpot: go.Spot.Left
      });
      if (size === 'small') {
        conf.strokeWidth = DataFlowStrokeSizes.outerBorder;
        conf.width = DataFlowCollapsedSizes[iocaType + 'Width'];
        conf.height = DataFlowCollapsedSizes[iocaType + 'Height'];
      }
    }
    return [merge(conf, specialConf), shapeBindings(iocaType, layer, size)];
  }

  /**
   * Change the stroke color of the outer border when the node is highlighted.
   * Don't change the inner border.
   *
   * @param  {string} iocaType
   * @param  {int} layer
   * @param  {string} size
   * @return {Array<go.Binding>}
   */
  function shapeBindings(iocaType, layer, size) {
    var bindings = [];
    if (layer === 0) {
      bindings.push(
        new go.Binding('stroke', 'isFaded', function(isFaded) {
          return isFaded ? DataFlowColors[iocaType + 'Light'] : DataFlowColors[iocaType];
        })
      );
    } else {
      bindings.push(
        new go.Binding('stroke', 'isHighlighted', function(h) {
          return h ? DataFlowColors.linkAccent : DataFlowColors.link;
        }).ofObject()
      );
    }
    if (size === 'small') {
      bindings.push(
        new go.Binding('fill', 'isFaded', function(isFaded) {
          return isFaded ? DataFlowColors[iocaType + 'Light'] : DataFlowColors[iocaType];
        })
      );
    }
    if (size === 'smallWhenCollapsed') {
      bindings.push(
        new go.Binding('fill', '', function(data) {
          if (data.isSubGraphExpanded) return DataFlowColors.fill;
          return data.isFaded ? DataFlowColors[iocaType + 'Light'] : DataFlowColors[iocaType];
        }),
        new go.Binding('strokeWidth', 'isSubGraphExpanded', function(e) {
          var width = DataFlowStrokeSizes.outerBorder;
          if (e) width += DataFlowStrokeSizes.innerBorder;
          return width;
        })
      );
    }
    return bindings;
  }

  function toolTip() {
    return $(go.Adornment, go.Panel.Spot,
      $(go.Placeholder, {
        padding: 5
      }),
      $(go.Panel, go.Panel.Auto, {
          alignmentFocus: new go.Spot(0, 0, -(DataFlowToolTip.leftOfPointy + DataFlowToolTip.pointyWidth / 2), 0),
          alignment: new go.Spot(0.5, 1, 0, 0)
        },
        $(go.Shape, 'ToolTip', {
          stroke: DataFlowColors.link,
          strokeWidth: DataFlowStrokeSizes.outerBorder,
          strokeJoin: 'round',
          fill: DataFlowColors.fill,
          minSize: new go.Size(DataFlowToolTip.leftOfPointy * 2 + DataFlowToolTip.pointyWidth, NaN)
        }),
        $(go.TextBlock, textStyle(), {
            width: DataFlowSizes.maxToolTipWidth
          },
          new go.Binding('text', 'description', function(description) {
            return description.join('\n');
          })
        )
      )
    );
  }

  function init() {
    globalDiagram = $(go.Diagram, 'globalDiagram', diagramConfig());

    globalDiagram.nodeTemplateMap.add('OfActivity',
      $(go.Node, go.Panel.Auto, nodeConfig({
          toolTip: toolTip()
        }),
        $(go.Shape, 'Activity2', iocaShapeConfig('activity', 1, 'small', {
          click: moreEventHandler
        })), layerBinding()
      )
    );

    var inputTemplate =
      $(go.Node, go.Panel.Auto, nodeConfig(),
        $(go.Shape, 'Input2', iocaShapeConfig('input', 1, 'full', {
          portId: 'trololo',
          stroke: DataFlowColors['input'],
          toolTip: toolTip(),
        })),
        $(go.Panel, go.Panel.Auto, {
            margin: DataFlowMargins.innerBorder
          },
          $(go.Shape, 'Input2', iocaShapeConfig('input', 0)),
          $(go.TextBlock, textConfig({
            font: DataFlowFonts.data,
            portId: '', // Attach links to the text to get into the inwards triangle
            toSpot: new go.Spot(0, 0.5, -(DataFlowStrokeSizes.innerBorder + DataFlowStrokeSizes.outerBorder + DataFlowMargins.nodeText.left) + 5, 0),
            fromSpot: new go.Spot(1, 0.5, DataFlowMargins.nodeText.right + DataFlowStrokeSizes.innerBorder + DataFlowStrokeSizes.outerBorder - 1, 0),
            click: moreEventHandler
          }))
        ),
        layerBinding()
      );

    globalDiagram.nodeTemplateMap.add('OfInput', inputTemplate);
    globalDiagram.nodeTemplateMap.add('OfValue', inputTemplate);

    globalDiagram.nodeTemplateMap.add('OfOutput',
      $(go.Node, go.Panel.Auto, nodeConfig(),
        { toolTip: toolTip() },
        $(go.Shape, 'Output2', iocaShapeConfig('output', 1, 'full', {
          stroke: DataFlowColors['output']
        })),
        $(go.Panel, go.Panel.Auto, {
            margin: DataFlowMargins.innerBorder
          },
          $(go.Shape, 'Output2', iocaShapeConfig('output', 0)),
          $(go.TextBlock, textConfig({
            font: DataFlowFonts.data,
            click: moreEventHandler
          }))
        ),
        layerBinding()
      )
    );


    function addGroupTemplate(category, shape, iocaType) {
      globalDiagram.groupTemplateMap.add(category,
        $(go.Group, groupConfig(), {toolTip: toolTip()},
          $(go.Shape, shape, iocaShapeConfig(iocaType, 1, 'smallWhenCollapsed', {
            stroke: DataFlowColors[iocaType]
          })),
          $(go.Panel, go.Panel.Auto, {
              margin: DataFlowMargins.innerBorder
            },
            // From https://forum.nwoods.com/t/get-the-desired-result-with-definefiguregenerator-auto-panel-geom-spot1-spot2/8204/21
            {
              name: 'PANEL'
            },
            $(go.Shape, shape, iocaShapeConfig(iocaType, 0)),
            $(go.Panel, 'Vertical', {
                name: 'innerObject'
              },
              $(go.TextBlock, textConfig({
                alignment: go.Spot.Left,
                width: NaN
              })),
              $(go.Placeholder, {
                // Don't act on group when clicking in-between member nodes
                background: 'transparent',
                click: function(e) {
                  e.handled = true;
                },
                cursor: 'normal',
                padding: DataFlowMargins.groupPadding
              }),
              $(go.Shape, {
                height: 0,
                width: 0,
                fill: null,
                strokeWidth: 0,
                portId: 'groupBottomSpot'
              })
            )
          )
        ));
    }
    addGroupTemplate('OfActivity', 'Activity2', 'algorithm');
    addGroupTemplate('OfLoop', 'Loop2', 'loop');
    addGroupTemplate('OfCondition', 'Condition2', 'condition');
    addGroupTemplate('OfConditionAlt', 'Condition2', 'conditionAlt');

    go.Shape.defineArrowheadGeometry("TriangleWithCutPointyEnd", "f m 0,0 l 12,7 0,6 -12,7 z");

    globalDiagram.linkTemplate = $(DataFlowLink, linkConfig(),
      $(go.Shape, linkShapeConfig()),
      $(go.Shape, {
          toArrow: "TriangleWithCutPointyEnd",
          stroke: null,
          visible: false
        },
        new go.Binding('fill', '', function(data) {
          // WARNING: binding on the whole object is costly
          if (data.isHighlighted || data.isPinned) {
            return DataFlowColors.linkAccent;
          }
          return data.isFaded ? DataFlowColors.linkLight : DataFlowColors.link;
        })
      )
    );

    globalDiagram.groupTemplateMap.add('layer',
      $(go.Group, layerConfig(),
        $(go.Shape, 'rectangle', {
          fill: 'white',
          strokeWidth: 12,
          stroke: "black"
        }),
        $(go.Placeholder, {
          background: 'transparent',
          click: function(e) {
            e.handled = true;
          },
          cursor: 'normal',
          padding: DataFlowMargins.groupPadding
        })
      )
    );

    globalDiagram.commandHandler.selectAll = function() {}; // make Select All command a no-op
  }

  function moreEventHandler(event, obj) {
    var node = obj.part;
    DataflowLayout.moveAdjNodesToLayer(globalDiagram, node);
  }

  function nodeMouseEnterHandler(event, node) {
    globalDiagram.clearHighlighteds();
    recursiveHighlightLink(node);
  }

  function nodeMouseLeaveHandler(/* event, node */) {
  }

  function nodeClickEventHandler(event, node) {
    if (node.category != 'OfInput' && node.category != 'OfOutput') return;
    // // TODO: handle clicks on unbound calls?

    // if (node.data.blackBoxNeighbourKey) {
    //   var blackBox = globalDiagram.findNodeForKey(node.data.blackBoxNeighbourKey);
    //   seeMoreNodes(node, blackBox);
    // // } else if (node.data.previousNodeDataArray && node.data.previousLinkDataArray) {
    // //   // TODO: handle the case when the node is not connected to the black box:
    // //   // roll back to a previous state where the node was connected to the black box
    // //   patchDiagram([{nodes: node.data.previousNodeDataArray, links: node.data.previousLinkDataArray}], node.data, true);
    // }
  }

  function recursiveHighlightLink(node) {
    eachConnectedNodeAndLink(node, function(node) {
      node.isHighlighted = true
    }, function(link) {
      link.isHighlighted = true
      link.updateRoute()
    })
  }

  this.redraw = function () {
    loadRootDiagram();
  };

  this.displayDiagram = function(algorithmId) {
    this.algorithmId = algorithmId;
    loadRootDiagram();
  };

  this.getGlobalDiagram = function() {
    return globalDiagram;
  };

  function startTransaction(name) {
    globalDiagram.startTransaction(name);
  }

  function commitTransaction(name) {
    globalDiagram.commitTransaction(name);
  }

  // Set data properties on which we make bindings and in which we store view state.
  // If possible, copy values from existing nodes with the same key.
  function initNodeViewState (nodeData) {
    nodeData.isSubGraphExpanded = true;
    nodeData.isHighlighted = false;
    nodeData.isFaded = false;
  }

  // SPEC: use-case 1
  function loadRootDiagram() {
    return client.loadFullGraph(that.algorithmId, null).then(function(partialGraphs) {
      partialGraphs[0].nodes.forEach(initNodeViewState);
      var model = new go.GraphLinksModel(partialGraphs[0].nodes,
        partialGraphs[0].links)
      //      globalDiagram.layout.addColumnsToModel(globalDiagram,model);
      globalDiagram.model = model;
      globalDiagram.layoutDiagram(true);
      // globalDiagram.layout.moveIntoLayers(globalDiagram,model);
      // globalDiagram.layoutDiagram(true);
    });
  }

  init();
};
