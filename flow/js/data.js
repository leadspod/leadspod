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
      "question": "Sign up",
      "options": {
        "2a": {
          "label": "<span>a</span><span>I have a invite code</span>",
          "val": "2a",
          "classes": "",
          "content": "<input id=\"code\" placeholder=\"code\"></input><button>submit</button>",
          "nextQ": null
        },
        "2b": {
          "label": "<span>b</span><span>With my linkedIn url </span>",
          "val": "2b",
          "content": "<input id=\"email\" placeholder=\"email\"></input><input id=\"url\" placeholder=\"url\"></input><button>submit</button>",
          "classes": "",
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
