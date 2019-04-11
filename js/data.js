var fq_colors = {
  "containerID": "flowquest_container",
  "questions": {
    1: {
      "question": "What do you want to achieve on LinkedIn?",
      "options": {
        "1a": {
          "label": "<span class='option'>a</span><span class='option-value'>I want to grow my network</span>",
          "val": "1a",
          "classes": "",
          "content": "",
          "nextQ": 2
        },
        "1b": {
          "label": "<span class='option'>b</span><span class='option-value'>I need feedback on my content</span>",
          "val": "1b",
          "classes": "",
          "nextQ": 2
        },
        "1c": {
          "label": "<span class='option'>c</span><span class='option-value'>I want more visibility</span>",
          "val": "1c",
          "classes": "",
          "nextQ": 2
        },
        "1d": {
          "label": "<span class='option'>d</span><span class='option-value'>I want to meet other content creators</span>",
          "val": "1d",
          "classes": "",
          "nextQ": 2
        },
        "1e": {
          "label": "<span class='option'>e</span><span class='option-value'>I need someone to motivate me to create content</span>",
          "val": "1e",
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
          "label": "<span class='option'>a</span><span class='option-value'>With my invite code</span>",
          "val": "2a",
          "classes": "",
          "content": "<div class=\"input-group mb-3\">\r\n <input id=\"email\" type=\"text\" class=\"form-control\" placeholder=\"Email\">\r\n <input id=\"code\" type=\"text\" class=\"form-control\" placeholder=\"Invite code\">\r\n  <div class=\"input-group-append\">\r\n    <button class=\"btn btn-outline-secondary\" type=\"button\">Submit<\/button>\r\n  <\/div>\r\n<\/div>",
          "nextQ": null
        },
        "2b": {
          "label": "<span class='option'>b</span><span class='option-value'>With my linkedIn url </span>",
          "val": "2b",
          "content": "<div class=\"input-group mb-3\">\r\n  <input id=\"email\" type=\"text\" class=\"form-control\" placeholder=\"Email\">\r\n  <input id=\"url\" type=\"text\" class=\"form-control\" placeholder=\"LinkedIn url\">\r\n <div class=\"input-group-append\">\r\n    <button class=\"btn btn-outline-secondary\" type=\"button\">Submit<\/button>\r\n  <\/div>\r\n<\/div>",
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
      },
      "1d|2a|": {
        "position": "1d",
        "content": "1d"
      },
      "1e|2a|": {
        "position": "1d",
        "content": "1d"
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
      },
      "1d|2b|": {
        "position": "2b",
        "content": "2b"
      },
      "1e|2b|": {
        "position": "2b",
        "content": "2b"
      }
    }
  }
}
