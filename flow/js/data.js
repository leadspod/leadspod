var fq_colors = {
  "containerID": "flowquest_container",
  "questions": {
    1: {
      "question": "What is your favorite color hue?",
      "options": {
        "red": {
          "label": "<span>a</span><span>Red</span>",
          "val": "red",
          "classes": "hue-red",
          "content": "<span>test content</span>",
          "nextQ": 2
        },
        "green": {
          "label": "Green",
          "val": "green",
          "classes": "hue-green",
          "nextQ": 2
        }
      }
    }
    /* RED */
    ,
    2: {
      "question": "What's your favorite shade of red?",
      "options": {
        "red-venetian": {
          "label": "1",
          "val": "red-venetian",
          "classes": "red-venetian",
          "nextQ": null
        },
        "red-folly": {
          "label": "2",
          "val": "red-folly",
          "classes": "red-folly",
          "nextQ": null
        }
      }
    }
  },
  answers: {
    patterns: {
      /* reds */
      "red|red-venetian|": {
        "position": "Venetian Red",
        "content": "Your favorite color is Venetian Red."
      },
      "red|red-folly|": {
        "position": "Folly Red",
        "content": "Your favorite color is Folly Red."
      }
      /* greens */
      ,
      "green|red-venetian|": {
        "position": "Venetian Red",
        "content": "Your favorite color is Venetian Red."
      },
      "green|red-folly|": {
        "position": "Folly Red",
        "content": "Your favorite color is Folly Red."
      }
    }
  }
}
