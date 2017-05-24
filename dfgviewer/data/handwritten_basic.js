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
  }],
  "nodeList": [{
      "backwardDepth": 1.0,
      "forwardDepth": 1.0,
      "topoIndex": 1.0,
      "category": "OfInput",
      "description": [
        "data"
      ],
      "text": "data",
      "calledGraphId": null,
      "key": "1",
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
        "print data"
      ],
      "text": "print data",
      "calledGraphId": null,
      "key": "2",
      "codeReference": {
        "fileName": "main.cpp",
        "lineStart": 1,
        "lineEnd": 1
      }
    }
  ],
  "meta": {
    "title": "Basic DFG"
  }
}
;
