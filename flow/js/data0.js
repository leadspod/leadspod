var fq_colors = {
  "containerID": "flowquest_container",
  "questions": {
    1: {
      "question": "What do you want to achieve on LinkedIn?",
      "options": {
        "red": {
          "label": "<span>a</span><span>I don’t want to look like nobody gives a shit about my stuff</span>",
          "val": "red",
          "classes": "hue-red",
          "content": "<span>test content</span>",
          "nextQ": 2
        },
        "green": {
          "label": "<span>b</span><span>I want to grow my network</span>",
          "val": "green",
          "classes": "hue-green",
          "nextQ": 2
        },
        "blue": {
          "label": "<span>c</span><span>I want to target a different network quickly</span>",
          "val": "blue",
          "classes": "hue-blue",
          "nextQ": 2
        }
      }
    }
    /* RED */
    ,
    2: {
      "question": "I want to sign up",
      "options": {
        "red-venetian": {
          "label": "<span>a</span><span>With a Invite code</span>",
          "content": "<input placeholder=\"code\"></input>",
          "val": "red-venetian",
          "classes": "red-venetian",
          "nextQ": null
        },
        "red-folly": {
          "label": "<span>b</span><span>With my LinkedIn account</span>",
          "content": "<input placeholder=\"LinkedIn url\"></input>",
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
      },
      "red|red-scarlet|": {
        "position": "Scarlet Red",
        "content": "Your favorite color is Scarlet Red."
      }
      /* greens */
      ,
      "green|green-lawn|": {
        "position": "Lawn Green",
        "content": "Your favorite color is Lawn Green."
      },
      "green|red-folly|": {
        "position": "Brunswick Green",
        "content": "Your favorite color is Brunswick Green."
      }
    }
  }
}
