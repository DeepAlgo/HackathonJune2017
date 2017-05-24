      var data = {
  "linkList": [{
      "from": {
        "nodeIdInCurrentGraph": "1",
        "nodeIdInCalledGraph": null
      },
      "to": {
        "nodeIdInCurrentGraph": "2",
        "nodeIdInCalledGraph": null
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "3",
        "nodeIdInCalledGraph": null
      },
      "to": {
        "nodeIdInCurrentGraph": "2",
        "nodeIdInCalledGraph": null
      }
    }
  ],
  "nodeList": [{
      "backwardDepth": 1.0,
      "forwardDepth": 1.0,
      "topoIndex": 1.0,
      "category": "OfOutput",
      "description": [
        "value is set to 1.0"
      ],
      "text": "value is set to 1.0",
      "calledGraphId": null,
      "key": "1",
      "codeReference": {
        "fileName": "main.cpp",
        "lineStart": 1,
        "lineEnd": 1
      }
    },
    {
      "backwardDepth": 1.0,
      "forwardDepth": 1.0,
      "topoIndex": 1.0,
      "category": "OfOutput",
      "description": [
        "value is set to 3.0"
      ],
      "text": "value is set to 3.0",
      "calledGraphId": null,
      "key": "3",
      "codeReference": {
        "fileName": "main.cpp",
        "lineStart": 1,
        "lineEnd": 1
      }
    },
    {
      "backwardDepth": 2.0,
      "forwardDepth": 2.0,
      "topoIndex": 2.0,
      "category": "OfActivity",
      "description": [
        "value is set to 1.0 OR",
        "value is set to 3.0"
      ],
      "text": "value",
      "calledGraphId": null,
      "key": "2",
      "codeReference": {
        "fileName": "main.cpp",
        "lineStart": 3,
        "lineEnd": 3
      }
    }
  ],
  "meta": {
    "title": "Multiple values DFG"
  }
}
;
