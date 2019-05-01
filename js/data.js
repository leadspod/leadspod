var fq_colors = {
  "containerID": "flowquest_container",
  "questions": {
    1: {
      "question": "Which is the area of your current business?",
      "options": {
        "1a": {
          "label": "<span class='option'>a</span><span class='option-value'>Health & fitness</span>",
          "val": "1a",
          "classes": "",
          "content": "",
          "nextQ": 2
        },
        "1b": {
          "label": "<span class='option'>b</span><span class='option-value'>Coaching</span>",
          "val": "1b",
          "classes": "",
          "nextQ": 2
        },
        "1c": {
          "label": "<span class='option'>c</span><span class='option-value'>Entrepreneurship</span>",
          "val": "1c",
          "classes": "",
          "nextQ": 2
        },
        "1d": {
          "label": "<span class='option'>d</span><span class='option-value'>Marketing</span>",
          "val": "1d",
          "classes": "",
          "nextQ": 2
        },
        "1e": {
          "label": "<span class='option'>e</span><span class='option-value'>Travel</span>",
          "val": "1e",
          "classes": "",
          "nextQ": 2
        },
        "1f": {
          "label": "<span class='option'>f</span><span class='option-value'>[ Other ]</span>",
          "val": "1f",
          "classes": "",
          "content": "<div class=\"input-group mb-3\">\r\n <input id=\"other\" type=\"text\" class=\"form-control\" placeholder=\"Other\">\r\n <div class=\"input-group-append\">\r\n    <button id=\"other-btn\" class=\"btn btn-outline-secondary\" type=\"button\">Submit<\/button>\r\n  <\/div>\r\n<\/div>",
          "nextQ": 2
        }
      }
    },
    2: {
      "question": "How often do you engage / post content on LinkedIn? ",
      "options": {
        "2a": {
          "label": "<span class='option'>a</span><span class='option-value'>Daily</span>",
          "val": "2a",
          "classes": "",
          "content": "",
          "nextQ": 3
        },
        "2b": {
          "label": "<span class='option'>b</span><span class='option-value'>2-4 times per week</span>",
          "val": "2b",
          "classes": "",
          "nextQ": 3
        },
        "2c": {
          "label": "<span class='option'>c</span><span class='option-value'>Weekly</span>",
          "val": "2c",
          "classes": "",
          "nextQ": 3
        }
      }
    },
    3: {
      "question": "What’s your number of followers on LinkedIn?",
      "options": {
        "3a": {
          "label": "<span class='option'>a</span><span class='option-value'>500 - 2000</span>",
          "val": "3a",
          "classes": "",
          "content": "",
          "nextQ": 4
        },
        "3b": {
          "label": "<span class='option'>b</span><span class='option-value'>2000 -  10000</span>",
          "val": "3b",
          "classes": "",
          "nextQ": 4
        },
        "3c": {
          "label": "<span class='option'>c</span><span class='option-value'>10000 - 30000</span>",
          "val": "3c",
          "classes": "",
          "nextQ": 4
        }
      }
    },
    4: {
      "question": "What do you want to achieve on LinkedIn?",
      "options": {
        "4a": {
          "label": "<span class='option'>a</span><span class='option-value'>I want to grow my network</span>",
          "val": "4a",
          "classes": "",
          "content": "",
          "nextQ": 5
        },
        "4b": {
          "label": "<span class='option'>b</span><span class='option-value'>I need feedback on my content</span>",
          "val": "4b",
          "classes": "",
          "nextQ": 5
        },
        "4c": {
          "label": "<span class='option'>c</span><span class='option-value'>I want more visibility</span>",
          "val": "4c",
          "classes": "",
          "nextQ": 5
        },
        "4d": {
          "label": "<span class='option'>d</span><span class='option-value'>I want to meet other content creators</span>",
          "val": "4d",
          "classes": "",
          "nextQ": 5
        },
        "4e": {
          "label": "<span class='option'>e</span><span class='option-value'>I need someone to motivate me to create content</span>",
          "val": "4e",
          "classes": "",
          "nextQ": 5
        }
      }
    },
    5: {
      "question": "Sign up",
      "options": {
        "5a": {
          "label": "<span class='option'>a</span><span class='option-value'>With my invite code</span>",
          "val": "5a",
          "classes": "",
          "content": "<div class=\"input-group mb-3\">\r\n <input id=\"url\" type=\"text\" class=\"form-control\" placeholder=\"LinkedIn url\">\r\n <\/div><div class=\"input-group mb-3\">\r\n <input id=\"email\" type=\"text\" class=\"form-control\" placeholder=\"Email\">\r\n <input id=\"code\" type=\"text\" class=\"form-control\" placeholder=\"Invite code\">\r\n  <div class=\"input-group-append\">\r\n    <button class=\"btn btn-outline-secondary\" type=\"button\">Submit<\/button>\r\n  <\/div>\r\n<\/div>",
          "nextQ": null
        },
        "5b": {
          "label": "<span class='option'>b</span><span class='option-value'>With my linkedIn url </span>",
          "val": "5b",
          "content": "<div class=\"input-group mb-3\">\r\n  <input id=\"email\" type=\"text\" class=\"form-control\" placeholder=\"Email\">\r\n  <input id=\"url\" type=\"text\" class=\"form-control\" placeholder=\"LinkedIn url\">\r\n <div class=\"input-group-append\">\r\n    <button class=\"btn btn-outline-secondary\" type=\"button\">Submit<\/button>\r\n  <\/div>\r\n<\/div>",
          "classes": "",
          "nextQ": null
        }
      }
    }
  },
  answers: {
    patterns: {
      "default": {
        "position": "default",
        "content": "default"
      },
      "!4a|5a|": {
        "position": "4a",
        "content": "4a"
      },
      "!4b|5a|": {
        "position": "4b",
        "content": "4b"
      },
      "!4c|5a|": {
        "position": "4c",
        "content": "4c"
      },
      "!4d|5a|": {
        "position": "4d",
        "content": "4d"
      },
      "!4e|5a|": {
        "position": "4d",
        "content": "4d"
      },
      "!4a|5b|": {
        "position": "5b",
        "content": "5b"
      },
      "!4b|5b|": {
        "position": "5b",
        "content": "5b"
      },
      "!4c|5b|": {
        "position": "5b",
        "content": "5b"
      },
      "!4d|5b|": {
        "position": "5b",
        "content": "5b"
      },
      "!4e|5b|": {
        "position": "5b",
        "content": "5b"
      }
    }
  }
}
