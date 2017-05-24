      var data = {
  "nodeList": [
    {
      "key": "254_14583",
      "calledGraphId": null,
      "text": "set ActorInTurn to false",
      "description": [
        "set ActorInTurn to false"
      ],
      "category": "OfActivity",
      "topoIndex": 11.0,
      "forwardDepth": 1.0,
      "backwardDepth": 7.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 188,
        "lineEnd": 188
      },
      "isGroup": true
    },
    {
      "key": "254_14589",
      "calledGraphId": null,
      "text": "actorName is set to getName of actor",
      "description": [
        "actorName is set to getName of actor"
      ],
      "category": "OfActivity",
      "topoIndex": 8.0,
      "forwardDepth": 5.0,
      "backwardDepth": 5.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 189,
        "lineEnd": 189
      }
    },
    {
      "key": "254_14585",
      "calledGraphId": null,
      "text": "actor",
      "description": [
        "actor"
      ],
      "category": "OfActivity",
      "topoIndex": 4.0,
      "forwardDepth": 1.0,
      "backwardDepth": 1.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 189,
        "lineEnd": 189
      }
    },
    {
      "key": "254_14586",
      "calledGraphId": null,
      "text": "getName",
      "description": [
        "getName"
      ],
      "category": "OfActivity",
      "topoIndex": 6.0,
      "forwardDepth": 3.0,
      "backwardDepth": 3.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 189,
        "lineEnd": 189
      },
      "isGroup": true
    },
    {
      "key": "254_14592",
      "calledGraphId": null,
      "text": "set ActorInTurn to true",
      "description": [
        "set ActorInTurn to true"
      ],
      "category": "OfActivity",
      "topoIndex": 10.0,
      "forwardDepth": 7.0,
      "backwardDepth": 7.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 190,
        "lineEnd": 190
      },
      "isGroup": true
    },
    {
      "key": "460_14581_2405",
      "calledGraphId": null,
      "text": "false",
      "description": [
        "false"
      ],
      "category": "OfValue",
      "topoIndex": 1.0,
      "forwardDepth": 0.0,
      "backwardDepth": 6.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 188,
        "lineEnd": 188
      }
    },
    {
      "key": "460_14129_2406",
      "calledGraphId": null,
      "text": "actorName",
      "description": [
        "actorName"
      ],
      "category": "OfInput",
      "topoIndex": 3.0,
      "forwardDepth": 0.0,
      "backwardDepth": 6.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 85,
        "lineEnd": 85
      }
    },
    {
      "key": "460_14578_2407",
      "calledGraphId": null,
      "text": "actor",
      "description": [
        "actor"
      ],
      "category": "OfInput",
      "topoIndex": 2.0,
      "forwardDepth": 0.0,
      "backwardDepth": 0.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 187,
        "lineEnd": 187
      }
    },
    {
      "key": "460_14590_2408",
      "calledGraphId": null,
      "text": "true",
      "description": [
        "true"
      ],
      "category": "OfValue",
      "topoIndex": 0.0,
      "forwardDepth": 0.0,
      "backwardDepth": 6.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 190,
        "lineEnd": 190
      }
    },
    {
      "key": "460_14578_2409",
      "calledGraphId": null,
      "text": "actor",
      "description": [
        "actor"
      ],
      "category": "OfOutput",
      "topoIndex": 5.0,
      "forwardDepth": 2.0,
      "backwardDepth": 2.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 187,
        "lineEnd": 187
      }
    },
    {
      "key": "460_14586_2410",
      "calledGraphId": null,
      "text": "getName",
      "description": [
        "getName"
      ],
      "category": "OfOutput",
      "topoIndex": 7.0,
      "forwardDepth": 4.0,
      "backwardDepth": 4.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 189,
        "lineEnd": 189
      }
    },
    {
      "key": "460_14129_2411",
      "calledGraphId": null,
      "text": "actorName is set to getName of actor",
      "description": [
        "actorName is set to getName of actor"
      ],
      "category": "OfOutput",
      "topoIndex": 9.0,
      "forwardDepth": 6.0,
      "backwardDepth": 6.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/gui/Main.java",
        "lineStart": 85,
        "lineEnd": 85
      }
    }
  ],
  "linkList": [
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14581_2405"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14583"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14129_2406"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14583"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "254_14589"
      },
      "to": {
        "nodeIdInCurrentGraph": "460_14129_2411"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14586_2410"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14589"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "254_14585"
      },
      "to": {
        "nodeIdInCurrentGraph": "460_14578_2409"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14578_2407"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14585"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "254_14586"
      },
      "to": {
        "nodeIdInCurrentGraph": "460_14586_2410"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14578_2409"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14586"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14590_2408"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14592"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14129_2411"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14592"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14129_2406"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14583",
        "nodeIdInCalledGraph": "458_14129_2389"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "460_14129_2411"
      },
      "to": {
        "nodeIdInCurrentGraph": "254_14592",
        "nodeIdInCalledGraph": "458_14129_2389"
      }
    }
  ],
  "meta": {
    "methodName": "org.ozsoft.texasholdem.gui.Main.actorRotated(org.ozsoft.texasholdem.Player [Public]) [Public]",
    "codeReference": {
      "fileName": "ozsoft/texasholdem/gui/Main.java",
      "lineStart": 186,
      "lineEnd": 191
    }
  }
};
