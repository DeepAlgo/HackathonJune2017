      var data = {
  "nodeList": [
    {
      "key": "161_21561",
      "calledGraphId": null,
      "text": "return getCards of hand",
      "description": [
        "return getCards of hand"
      ],
      "category": "OfActivity",
      "topoIndex": 5.0,
      "forwardDepth": 5.0,
      "backwardDepth": 5.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 198,
        "lineEnd": 198
      }
    },
    {
      "key": "161_21557",
      "calledGraphId": null,
      "text": "hand",
      "description": [
        "hand"
      ],
      "category": "OfActivity",
      "topoIndex": 1.0,
      "forwardDepth": 1.0,
      "backwardDepth": 1.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 198,
        "lineEnd": 198
      }
    },
    {
      "key": "161_21558",
      "calledGraphId": null,
      "text": "How to manage create card from hand?",
      "description": [
        "getCards"
      ],
      "category": "OfActivity",
      "topoIndex": 3.0,
      "forwardDepth": 3.0,
      "backwardDepth": 3.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 198,
        "lineEnd": 198
      },
      "isGroup": true
    },
    {
      "key": "376_21319_1825",
      "calledGraphId": null,
      "text": "hand",
      "description": [
        "hand"
      ],
      "category": "OfInput",
      "topoIndex": 0.0,
      "forwardDepth": 0.0,
      "backwardDepth": 0.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 42,
        "lineEnd": 42
      }
    },
    {
      "key": "376_21319_1826",
      "calledGraphId": null,
      "text": "hand",
      "description": [
        "hand"
      ],
      "category": "OfOutput",
      "topoIndex": 2.0,
      "forwardDepth": 2.0,
      "backwardDepth": 2.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 42,
        "lineEnd": 42
      }
    },
    {
      "key": "376_21558_1827",
      "calledGraphId": null,
      "text": "getCards",
      "description": [
        "getCards"
      ],
      "category": "OfOutput",
      "topoIndex": 4.0,
      "forwardDepth": 4.0,
      "backwardDepth": 4.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 198,
        "lineEnd": 198
      }
    },
    {
      "key": "376_21561_1828",
      "calledGraphId": null,
      "text": "return getCards of hand",
      "description": [
        "return getCards of hand"
      ],
      "category": "OfOutput",
      "topoIndex": 6.0,
      "forwardDepth": 6.0,
      "backwardDepth": 6.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 198,
        "lineEnd": 198
      }
    }
  ],
  "linkList": [
    {
      "from": {
        "nodeIdInCurrentGraph": "161_21561"
      },
      "to": {
        "nodeIdInCurrentGraph": "376_21561_1828"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "376_21558_1827"
      },
      "to": {
        "nodeIdInCurrentGraph": "161_21561"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "161_21557"
      },
      "to": {
        "nodeIdInCurrentGraph": "376_21319_1826"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "376_21319_1825"
      },
      "to": {
        "nodeIdInCurrentGraph": "161_21557"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "161_21558"
      },
      "to": {
        "nodeIdInCurrentGraph": "376_21558_1827"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "376_21319_1826"
      },
      "to": {
        "nodeIdInCurrentGraph": "161_21558"
      }
    }
  ],
  "meta": {
    "methodName": "org.ozsoft.texasholdem.Player.getCards() [Public,Multiple]",
    "codeReference": {
      "fileName": "ozsoft/texasholdem/Player.java",
      "lineStart": 197,
      "lineEnd": 199
    }
  }
};
