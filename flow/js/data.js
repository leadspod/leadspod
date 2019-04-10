var fq_colors = {
  "containerID": "flowquest_container",
  "questions": {
    1: {
      "question": "What do you want to achieve on LinkedIn?",
      "options": {
        "1a": {
          "label": "<span>a</span><span>I don’t want to look like nobody gives a shit about my stuff</span>",
          "val": "1a",
          "classes": "",
          "content": "<span>test content</span>",
          "nextQ": 2
        },
        "1b": {
          "label": "<span>b</span><span>I want to grow my network</span>",
          "val": "1b",
          "classes": "",
          "nextQ": 2
        },
        "1c": {
          "label": "<span>c</span><span>I want to target a different network quickly</span>",
          "val": "1c",
          "classes": "",
          "nextQ": 2
        }
      }
    }
    /* RED */
    ,
    2: {
      "question": "What's your favorite shade of red?",
      "options": {
        "2a": {
          "label": "1",
          "val": "2a",
          "classes": "",
          "nextQ": null
        },
        "2b": {
          "label": "2",
          "val": "2b",
          "classes": "red-folly",
          "nextQ": null
        }
      }
    }
  },
  answers: {
    patterns: {
      /* reds */
      "1a|2a|": {
        "position": "1a",
        "content": "1a"
      },
      "1b|2a|": {
        "position": "1b",
        "content": "1b"
      },
      "1c|2a|": {
        "position": "1c",
        "content": "1c"
      }
      /* greens */
      ,
      "1a|2b|": {
        "position": "2b",
        "content": "2b"
      },
      "1b|2b|": {
        "position": "2b",
        "content": "2b"
      },
      "1c|2b|": {
        "position": "2b",
        "content": "2b"
      }
    }
  }
}
