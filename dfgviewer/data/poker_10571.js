      var data = {
  "nodeList": [
    {
      "key": "110_10571",
      "calledGraphId": null,
      "text": "Create a Hand",
      "description": [
        "Create a Hand"
      ],
      "category": "OfActivity",
      "topoIndex": 1.0,
      "forwardDepth": 0.0,
      "backwardDepth": 4.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Hand.java",
        "lineStart": 60,
        "lineEnd": 62
      }
    },
    {
      "key": "110_10569",
      "calledGraphId": null,
      "text": "addCards cards",
      "description": [
        "addCards cards"
      ],
      "category": "OfActivity",
      "topoIndex": 4.0,
      "forwardDepth": 3.0,
      "backwardDepth": 3.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Hand.java",
        "lineStart": 61,
        "lineEnd": 61
      },
      "isGroup": true
    },
    {
      "key": "110_10567",
      "calledGraphId": null,
      "text": "cards",
      "description": [
        "cards"
      ],
      "category": "OfActivity",
      "topoIndex": 2.0,
      "forwardDepth": 1.0,
      "backwardDepth": 1.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Hand.java",
        "lineStart": 61,
        "lineEnd": 61
      }
    },
    {
      "key": "281_10564_116",
      "calledGraphId": null,
      "text": "cards",
      "description": [
        "cards"
      ],
      "category": "OfInput",
      "topoIndex": 0.0,
      "forwardDepth": 0.0,
      "backwardDepth": 0.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Hand.java",
        "lineStart": 60,
        "lineEnd": 60
      }
    },
    {
      "key": "281_10571_117",
      "calledGraphId": null,
      "text": "Create a Hand",
      "description": [
        "Create a Hand"
      ],
      "category": "OfOutput",
      "topoIndex": 6.0,
      "forwardDepth": 5.0,
      "backwardDepth": 5.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Hand.java",
        "lineStart": 60,
        "lineEnd": 62
      }
    },
    {
      "key": "281_10564_118",
      "calledGraphId": null,
      "text": "cards",
      "description": [
        "cards"
      ],
      "category": "OfOutput",
      "topoIndex": 3.0,
      "forwardDepth": 2.0,
      "backwardDepth": 2.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Hand.java",
        "lineStart": 60,
        "lineEnd": 60
      }
    },
    {
      "key": "281_10547_119",
      "calledGraphId": null,
      "text": "cards",
      "description": [
        "cards"
      ],
      "category": "OfOutput",
      "topoIndex": 5.0,
      "forwardDepth": 4.0,
      "backwardDepth": 4.0,
      "codeReference": {
        "fileName": "ozsoft/texasholdem/Hand.java",
        "lineStart": 39,
        "lineEnd": 39
      }
    }
  ],
  "linkList": [
    {
      "from": {
        "nodeIdInCurrentGraph": "110_10571"
      },
      "to": {
        "nodeIdInCurrentGraph": "281_10571_117"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "110_10569"
      },
      "to": {
        "nodeIdInCurrentGraph": "281_10547_119"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "281_10564_118"
      },
      "to": {
        "nodeIdInCurrentGraph": "110_10569"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "110_10567"
      },
      "to": {
        "nodeIdInCurrentGraph": "281_10564_118"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "281_10564_116"
      },
      "to": {
        "nodeIdInCurrentGraph": "110_10567"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "281_10547_119"
      },
      "to": {
        "nodeIdInCurrentGraph": "281_10571_117"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "110_10569",
        "nodeIdInCalledGraph": "279_10547_108"
      },
      "to": {
        "nodeIdInCurrentGraph": "281_10547_119"
      }
    },
    {
      "from": {
        "nodeIdInCurrentGraph": "110_10569",
        "nodeIdInCalledGraph": "3611_output"
      },
      "to": {
        "nodeIdInCurrentGraph": "281_10547_119"
      }
    }
  ],
  "meta": {
    "methodName": "org.ozsoft.texasholdem.Hand.Hand(org.ozsoft.texasholdem.Card [Public] [Multiple]) [Public]",
    "codeReference": {
      "fileName": "ozsoft/texasholdem/Hand.java",
      "lineStart": 60,
      "lineEnd": 62
    }
  }
};
