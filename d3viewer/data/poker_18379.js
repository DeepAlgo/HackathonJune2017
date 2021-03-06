      var data = {
  "nodeList": [
    {
      "key": "240_18375",
      "calledGraphId": null,
      "text": "controlPanel",
      "description": [
        "controlPanel"
      ],
      "category": "OfActivity",
      "topoIndex": 1.0,
      "forwardDepth": 1.0,
      "backwardDepth": 1.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/BoardPanel.java",
        "lineStart": 225,
        "lineEnd": 225
      }
    },
    {
      "key": "240_18376",
      "calledGraphId": null,
      "text": "waitForUserInput",
      "description": [
        "waitForUserInput"
      ],
      "category": "OfActivity",
      "topoIndex": 3.0,
      "forwardDepth": 3.0,
      "backwardDepth": 3.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/BoardPanel.java",
        "lineStart": 225,
        "lineEnd": 225
      },
      "isGroup": true
    },
    {
      "key": "442_17445_2267",
      "calledGraphId": null,
      "text": "controlPanel",
      "description": [
        "controlPanel"
      ],
      "category": "OfInput",
      "topoIndex": 0.0,
      "forwardDepth": 0.0,
      "backwardDepth": 0.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/BoardPanel.java",
        "lineStart": 46,
        "lineEnd": 46
      }
    },
    {
      "key": "442_17445_2268",
      "calledGraphId": null,
      "text": "controlPanel",
      "description": [
        "controlPanel"
      ],
      "category": "OfOutput",
      "topoIndex": 2.0,
      "forwardDepth": 2.0,
      "backwardDepth": 2.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/BoardPanel.java",
        "lineStart": 46,
        "lineEnd": 46
      }
    },
    {
      "key": "442_12247_2269",
      "calledGraphId": null,
      "text": "defaultAction",
      "description": [
        "defaultAction"
      ],
      "category": "OfOutput",
      "topoIndex": 5.0,
      "forwardDepth": 4.0,
      "backwardDepth": 4.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/AmountPanel.java",
        "lineStart": 67,
        "lineEnd": 67
      }
    },
    {
      "key": "442_15790_2270",
      "calledGraphId": null,
      "text": "selectedAction",
      "description": [
        "selectedAction"
      ],
      "category": "OfOutput",
      "topoIndex": 4.0,
      "forwardDepth": 4.0,
      "backwardDepth": 4.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/ControlPanel.java",
        "lineStart": 72,
        "lineEnd": 72
      }
    }
  ],
  "linkList": [
    {
      "from": {
        "nodeIdInCurrentGraph": "240_18375"
      },
      "to": {
        "nodeIdInCurrentGraph": "442_17445_2268"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "442_17445_2267"
      },
      "to": {
        "nodeIdInCurrentGraph": "240_18375"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "240_18376"
      },
      "to": {
        "nodeIdInCurrentGraph": "442_12247_2269"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "240_18376"
      },
      "to": {
        "nodeIdInCurrentGraph": "442_15790_2270"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "442_17445_2268"
      },
      "to": {
        "nodeIdInCurrentGraph": "240_18376"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "240_18376",
        "nodeIdInCalledGraph": "440_12247_2265"
      },
      "to": {
        "nodeIdInCurrentGraph": "442_12247_2269"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "240_18376",
        "nodeIdInCalledGraph": "440_15790_2266"
      },
      "to": {
        "nodeIdInCurrentGraph": "442_15790_2270"
      }
    }
  ],
  "meta": {
    "methodName": "org.ozsoft.texasholdem.gui.BoardPanel.waitForUserInput() [Public]",
    "codeReference": {
      "fileName": "ozsoft/texasholdem/gui/BoardPanel.java",
      "lineStart": 224,
      "lineEnd": 226
    }
  }
};
