      var data = {
  "nodeList": [
    {
      "key": "165_21635",
      "calledGraphId": null,
      "text": "increment cash by amount",
      "description": [
        "increment cash by amount"
      ],
      "category": "OfActivity",
      "topoIndex": 4.0,
      "forwardDepth": 3.0,
      "backwardDepth": 3.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 245,
        "lineEnd": 245
      }
    },
    {
      "key": "165_21633",
      "calledGraphId": null,
      "text": "amount",
      "description": [
        "amount"
      ],
      "category": "OfActivity",
      "topoIndex": 2.0,
      "forwardDepth": 1.0,
      "backwardDepth": 1.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 245,
        "lineEnd": 245
      }
    },
    {
      "key": "526_21324_3361",
      "calledGraphId": null,
      "text": "cash",
      "description": [
        "cash"
      ],
      "category": "OfInput",
      "topoIndex": 1.0,
      "forwardDepth": 0.0,
      "backwardDepth": 2.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 45,
        "lineEnd": 45
      }
    },
    {
      "key": "526_21631_3362",
      "calledGraphId": null,
      "text": "amount",
      "description": [
        "amount"
      ],
      "category": "OfInput",
      "topoIndex": 0.0,
      "forwardDepth": 0.0,
      "backwardDepth": 0.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 244,
        "lineEnd": 244
      }
    },
    {
      "key": "526_21631_3363",
      "calledGraphId": null,
      "text": "amount",
      "description": [
        "amount"
      ],
      "category": "OfOutput",
      "topoIndex": 3.0,
      "forwardDepth": 2.0,
      "backwardDepth": 2.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 244,
        "lineEnd": 244
      }
    },
    {
      "key": "526_21324_3364",
      "calledGraphId": null,
      "text": "increment cash by amount",
      "description": [
        "increment cash by amount"
      ],
      "category": "OfOutput",
      "topoIndex": 5.0,
      "forwardDepth": 4.0,
      "backwardDepth": 4.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Player.java",
        "lineStart": 45,
        "lineEnd": 45
      }
    }
  ],
  "linkList": [
    {
      "from": {
        "nodeIdInCurrentGraph": "165_21635"
      },
      "to": {
        "nodeIdInCurrentGraph": "526_21324_3364"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "526_21324_3361"
      },
      "to": {
        "nodeIdInCurrentGraph": "165_21635"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "526_21631_3363"
      },
      "to": {
        "nodeIdInCurrentGraph": "165_21635"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "165_21633"
      },
      "to": {
        "nodeIdInCurrentGraph": "526_21631_3363"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "526_21631_3362"
      },
      "to": {
        "nodeIdInCurrentGraph": "165_21633"
      }
    }
  ],
  "meta": {
    "methodName": "org.ozsoft.texasholdem.Player.win(int) [Public]",
    "codeReference": {
      "fileName": "ozsoft/texasholdem/Player.java",
      "lineStart": 244,
      "lineEnd": 246
    },
    "title": "How to manage increment cash amount from player with win?"
  }
};
