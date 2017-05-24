
function copy(el) {
  var new_el = {};
  for (var i in el) {
      new_el[i] = el[i];
  }
  return new_el;
}

function merge(a, b) {
  if(b === undefined)
    return a;
  for(var i in b) {
    a[i] = b[i];
  }
  return a;
}

function hasTags(tags) {
  return tags && Object.keys(tags).length > 0;
}

// Returns a copy of the nodeList where
// elements are unique by key.
function unique(nodeList) {
  var seen = {};
  var uniqueNodeList = [];
  for(var i = 0; i < nodeList.length; i++) {
    var node = nodeList[i];
    if(seen[node.key])
      continue;
    seen[node.key] = true;
    uniqueNodeList.push(node);
  }
  return uniqueNodeList;
}

// Common UI elements
var CommonUI = (function(){
  // Tag tooltip
  function displayTags(tags) {
    if(hasTags(tags)) {
      var tag_values = [];
      for(var k in tags) {
        Array.prototype.push.apply(tag_values, tags[k]);
      }
      return "Tags: " + tag_values.join(', ');
    }
  }

  function showCheckboxesId(elementId) {
    var checkboxes = document.querySelector("#" + elementId + " .checkboxes");
    var display_value = checkboxes.style.display;
    checkboxes.style.display = display_value === "block" ? "none": "block";
    checkboxes.parentElement.style.height = display_value === "block" ? "0": "100%";
  }

  /**
   * Put the given rect on the screen, scrolling by the necessary amount.
   *   - do nothing if the rectangle is already visible.
   *   - scroll by a minimal amount if the whole rectangle fits on the screen
   *   - align in the top-left corner if the rectangle is too big
   * @param {go.Diagram} diagram
   * @param {go.Rect} rect
   */
  function makeRectVisible(diagram, rect) {
    var margin = 50; // px
    var viewport = diagram.viewportBounds.copy();
    if (rect.right > viewport.right) {
      viewport.offset(rect.right - viewport.right + margin, 0);
    }
    if (rect.left < viewport.left) {
      viewport.offset(rect.left - viewport.left - margin, 0);
    }
    if (rect.bottom > viewport.bottom) {
      viewport.offset(0, rect.bottom - viewport.bottom + margin);
    }
    if (rect.top < viewport.top) {
      viewport.offset(0, rect.top - viewport.top - margin);
    }
    diagram.centerRect(viewport);
  }

  return {
    /**
     * GoJS element for a small IOCA logo.
     * @param  {String} iocaType One of "input", "output", "cond", "act"
     * @return {go.Picture}
     */
    iocaLogo: function(iocaType) {
      var $ = go.GraphObject.make;
      return $(go.Picture,
        {
          desiredSize: new go.Size(24, 24),
          source: "images/" + iocaType + ".png",
        }
      );
    },

    /**
     * Build a standardized tooltip template for a node.
     * @param  {go.GraphObject, null} icon
     *     If null, the tooltip does not have an icon.
     * @param  {String, go.Binding} legend
     *     The legend of this node (which kind of node it is)
     *     If it's a binding, it must bind to the "text" property.
     * @param  {String, go.Binding, null} clickText
     *     An explanation of what the user can do by clicking on the node,
     *     in the form of an imperative phrase. E.g. "View a nice diagram".
     *     If it's a binding, it must bind to the "text" property.
     *     If null, nothing is shown.
     * @param  {String, go.Binding, null} tagText
     *     The text about matching keywords of the node.
     *     The binding must bind to the "text" property.
     * @return {go.Adornment} The tooltip template
     */
    toolTipTemplate: function(icon, legend, clickText, tagText) {
      var $ = go.GraphObject.make;
      // TODO restore comments in the tooltips
      //var comments = data.comments ? decodeURI(data.comments) : null;
      return $(go.Adornment, "Auto",
        $(go.Shape, { fill: Colors.toolTipBackground }),
        $(go.Panel, "Vertical",
          $(go.Panel, "Horizontal",
            {
              alignment: go.Spot.Left,
              margin: new go.Margin(0, 0, 0, icon ? Sizes.toolTipTextMargin : 0),
              maxSize: new go.Size(Sizes.maxToolTipWidth, Infinity),
            },
            icon ? icon : [],
            $(go.TextBlock,
              {
                margin: Sizes.toolTipTextMargin,
              },
              legend
            )
          ),
          (clickText ? $(go.TextBlock,
            {
              alignment: go.Spot.Left,
              margin: Sizes.toolTipTextMargin,
              maxSize: new go.Size(Sizes.maxToolTipWidth, Infinity),
            },
            clickText
          ) : []),
          (tagText ? $(go.TextBlock,
            {
              alignment: go.Spot.Left,
              margin: Sizes.toolTipTextMargin,
              maxSize: new go.Size(Sizes.maxToolTipWidth, Infinity),
            },
            tagText
          ) : [])
        )
      );
    },

    makeRectVisible: makeRectVisible,

    /**
     * Put the given rect on the screen.
     *   - center if the whole rectangle fits on the screen
     *   - align in the top-left corner if the rectangle is too big
     * @param {go.Diagram} diagram
     * @param {go.Rect} rect
     */
    centerOrTopLeftRect: function (diagram, rect) {
      diagram.centerRect(rect);
      makeRectVisible(diagram, rect);
    },

    /**
     * Put the given rect on the screen, top-left corner
     * @param {go.Diagram} diagram
     * @param {go.Rect} rect
     */
    topLeftRect: function (diagram, rect) {
      var viewportSizedRect = rect.copy();
      viewportSizedRect.size = diagram.viewportBounds.size;
      makeRectVisible(diagram, viewportSizedRect);
    },

    sharedDiagramConfig: function (specialConf) {
      return merge({
        "undoManager.isEnabled": false,
        "toolManager.hoverDelay": 300,
        "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
        "draggingTool.isEnabled": false,
        "dragSelectingTool.isEnabled": false,
        hasVerticalScrollbar: false,
        hasHorizontalScrollbar: false,
        scrollMode: go.Diagram.InfiniteScroll,
      }, specialConf);
    },

    display_loading: function() {
      $("#diagram-container").stop().animate({opacity: 0.2}, 300);
      $("#loading").stop().animate({opacity: 1, zIndex: 1000}, 300);
    },

    hide_loading: function() {
      $("#diagram-container").stop().animate({opacity: 1}, 300);
      $("#loading").stop().animate({opacity: 0, zIndex: -1}, 300);
    },

    smallLogoShape: function(geometry, specialConf, bindings) {
      var $ = go.GraphObject.make;
      bindings = bindings || [];
      return $(go.Shape, merge({
        width: Sizes.smallButtonSize,
        // The height is computed by GoJS depending on the icon proportions
        geometryStretch: go.GraphObject.Uniform,
        fill: Colors.normalDarkText,
        strokeWidth: 0,
        geometry: geometry,
      }, specialConf), bindings);
    },

    showCheckboxes: function (select) {
      showCheckboxesId(select.parentElement.id);
    },

    showCheckboxesId: showCheckboxesId,

    toggleHelp: function () {
      var elem = document.getElementById("help");
      if (elem.style.visibility == "visible") {
        elem.style.visibility="hidden";
        elem.style.height=0;
      }  else {
        elem.style.visibility="visible";
        elem.style.height="auto";
      }
    },

    // Taken from http://gojs.net/latest/intro/buttons.html
    // and http://gojs.net/latest/extensions/Buttons.js
    // TODO try to factorize with activity SubGraphExpanderButton
    expanderButton: function (expandedPropertyName, specialConf) {
      var $ = go.GraphObject.make;
      return $("Button", merge({ // set these values for the isSubGraphExpanded binding conversion
          "_subGraphExpandedFigure": "MinusLine",
          "_subGraphCollapsedFigure": "PlusLine",
          cursor: "pointer",
          width: Sizes.smallButtonSize,
          height: Sizes.smallButtonSize,
        }, specialConf),
        $(go.Shape,  // the icon
          {
            name: "ButtonIcon",
            figure: "MinusLine",  // default value for isSubGraphExpanded is true
            desiredSize: new go.Size(6, 6),
          },
          // bind the Shape.figure to the Group.isSubGraphExpanded value using this converter:
          new go.Binding("figure", expandedPropertyName,
          function(exp, shape) {
            var button = shape.panel;
            return exp ? button["_subGraphExpandedFigure"] : button["_subGraphCollapsedFigure"];
          })
        )
      );
    },
  };
})();

var Colors = (function () {
  var ccsOrange = "#fc4e2c";
  var ccsGreen = "#22FF00";

  return {
    // Block
    classBackground: "#ddd",
    methodBackground: "#eee",
    normalBlockBackground: "white",
    inputBackground: "rgb(120, 90, 200)",
    conditionBackground: "rgb(255, 162, 0)",
    activityBackground: "rgb(1, 126, 255)",
    outputBackground: "rgb(30, 190, 180)",
    normalBlockStroke: "black",
    highlightedBlockStroke: ccsOrange,
    overviewBlockBackground: ccsOrange,
    toolTipBackground: "#FFFFCC",
    toolTipIcon: ccsOrange,

    // Node
    normalNodeBackground: "white",
    normalNodeStroke: "black",
    discreetNodeStroke: "#474747",
    highlightedNodeStroke: ccsOrange,
    highlightedNodeBackground: "#ffe1db",
    returnNodeBackground: ccsGreen,

    // Link
    normalLinkStroke: "black",
    highlightedLinkStroke: ccsOrange,
    normalArrowheadFill: "white",

    // UI (badges, buttons...)
    normalAdornmentBackground: "#9e9e9e",
    highlightedAdornmentBackground: ccsOrange,
    normalButtonBackground: ccsOrange,
    normalButtonStroke: ccsOrange,

    // Text
    normalDarkText: "black",
    normalLightText: "white",
    highlightedText: ccsOrange,
    lessImportantText: "#666",
    trueConditionText: "#006E29",
    falseConditionText: "#9C0F0F",
    conditionText: "#dc322f",

    // Palettes
    // Solarized accent colors: http://ethanschoonover.com/solarized
    // TODO checkout http://google.github.io/palette.js/
    strokePalette: [
      /* yellow:  */ "#b58900",
      /* red:     */ "#dc322f",
      /* green:   */ "#859900",
      /* violet:  */ "#6c71c4",
      /* orange:  */ "#cb4b16",
      /* cyan:    */ "#2aa198",
      /* magenta: */ "#d33682",
      /* blue:    */ "#268bd2",
    ],
  };
})();

var Fonts = {
  className: "bold 11pt sans-serif",
  methodName: "11pt sans-serif",
  nodeText: "11pt sans-serif",
  hugeNodeText: "22pt sans-serif",
  text: "11pt sans-serif",
  boldText: "bold 11pt sans-serif",
};

var Sizes = {
  minActorWidth: 250,
  minActivityWidth: 250,
  maxTextWidth: 600,
  maxToolTipWidth: 440,
  normalPadding: 10,
  smallTextMargin: 2,
  normalTextVerticalMargin: 6,
  normalTextHorizontalMargin: 8,
  normalTextGoMargin: new go.Margin(6, 8, 6, 8),
  smallButtonMargin: 5,
  smallButtonSize: 16,
  adornmentButtonMargin: 2,
  hiddenNodeSize: 14,
  toolTipTextMargin: 4,
  nodeStrokeWidth: 1,
  highlightedNodeStrokeWidth: 1, // FIXME: used only in activity?
  pinnedNodeStrokeWidth: 4,
  linkStrokeWidth: 2,
};

var DeepAlgoEmbedHelper = (function () {
  // Check whether we're in an iframe
  var deepAlgoEmbed = window.top !== window;

  return {
    isEmbedded: function () {
      return deepAlgoEmbed;
    },
  };
})();

// Redefined button to apply custom styling
// Taken from http://gojs.net/latest/extensions/Buttons.js
go.GraphObject.defineBuilder("DeepAlgoButton", function(args) {
  // default brushes for "Button" shape
  var buttonFillNormal = Colors.normalButtonBackground;
  var buttonStrokeNormal = Colors.normalButtonStroke;

  var buttonFillOver = Colors.normalButtonBackground;
  var buttonStrokeOver = Colors.normalButtonStroke;

  var button = /** @type {Panel} */ (
    go.GraphObject.make(go.Panel, "Auto",
        { isActionable: true },  // needed so that the ActionTool intercepts mouse events
        { // save these values for the mouseEnter and mouseLeave event handlers
          "_buttonFillNormal": buttonFillNormal,
          "_buttonStrokeNormal": buttonStrokeNormal,
          "_buttonFillOver": buttonFillOver,
          "_buttonStrokeOver": buttonStrokeOver,
          cursor: "pointer",
        },
        go.GraphObject.make(go.Shape,  // the border
          {
            name: "ButtonBorder",
            figure: "Rectangle",
            fill: buttonFillNormal,
            stroke: buttonStrokeNormal,
          }))
  );

  // There"s no GraphObject inside the button shape -- it must be added as part of the button definition.
  // This way the object could be a TextBlock or a Shape or a Picture or arbitrarily complex Panel.

  // mouse-over behavior
  button.mouseEnter = function(e, button, prev) {
    var shape = button.findObject("ButtonBorder");  // the border Shape
    if (shape instanceof go.Shape) {
      var brush = button["_buttonFillOver"];
      button["_buttonFillNormal"] = shape.fill;
      shape.fill = brush;
      brush = button["_buttonStrokeOver"];
      button["_buttonStrokeNormal"] = shape.stroke;
      shape.stroke = brush;
    }
  };

  button.mouseLeave = function(e, button, prev) {
    var shape = button.findObject("ButtonBorder");  // the border Shape
    if (shape instanceof go.Shape) {
      shape.fill = button["_buttonFillNormal"];
      shape.stroke = button["_buttonStrokeNormal"];
    }
  };

  return button;
});
