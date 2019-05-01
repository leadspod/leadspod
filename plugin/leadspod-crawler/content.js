// var getPostIds = function () {
//   var postIds = JSON.parse(localStorage.getItem("postids"));
//   if(postIds == null || postIds == "") {
//     postIds = [];
//   }
//   return postIds;
// }
// var addToPostIds = function (id) {
//   var postIds = getPostIds();
//   postIds.push(id);
//   localStorage.setItem("postids", JSON.stringify(postIds));
// }
// var isInPostIds = function (id) {
//   var postIds = getPostIds();
//   if(postIds.indexOf(id) == -1) return false;
//   return true;
// }
// var getDeleteButton = function () {
//   var button = document.createElement("button");
//   button.innerHTML = "Delete";
//   button.style.position = "absolute";
//   button.style.marginTop = "-21px";
//   button.classList.add("delete-button");
//   button.addEventListener("click", function () {
//     var post = this.parentElement;
//     var id = post.parentElement.getAttribute('data-id');
//     addToPostIds(id);
//     post.remove();
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//     window.startRunning = true;
//   });
//   return button;
// }


var shake = function () {
  window.scrollBy(0, 100);
  window.scrollBy(0, -100);
}
var counter = {
  likes: 0,
  comments: 0
}
var getSocialCounts = function (child, kind) {
  var re = new RegExp(kind, 'gi')
  var matches = child.innerText.match(re)
  if(matches && matches.length > 0) {
    var nr = child.innerText.split(' ')[0];
    return parseInt(nr);
  }
  return 0;
}


window.onload = function(e) {
  if(window.location.href.indexOf('recent-activity/shares') > 0) {
    var posts = document.querySelectorAll('.feed-shared-update-v2');
    window.startRunning = true;

    if(posts.length == 0) {
      shake();
      setTimeout(function () {
        // start(request, sender, sendResponse);
        window.startRunning = true;
      }, 2000);
    } else {
      var postsCount = 0;
      posts.forEach(function (element) {
        var timePeriodDiv = element.getElementsByClassName("feed-shared-actor__sub-description")[0];
        // console.log(timePeriodDiv.innerText);
        console.log(postsCount);
        var socialCounts = element.getElementsByClassName('feed-shared-social-counts')[0];
        if(socialCounts) {
          for(var i = 0; i < socialCounts.children.length; i++) {
            counter.likes = counter.likes + getSocialCounts(socialCounts.children[i], 'likes');
            counter.comments = counter.comments + getSocialCounts(socialCounts.children[i], 'comments');
          }
        }
        // var re = new RegExp('gi')
        // var matches = timePeriodDiv.innerText.match(re)
        if(postsCount < 6) {
          if(window.startRunning) {
            window.startRunning = false;
            alert("posts : " + counter.posts + "\n" + "likes : " + counter.likes + "\n" + "comments : " + counter.comments + "");
            //location.reload();
          }
        } else {
          element.remove();
          counter.posts++;
        }
        postsCount++;
      });
    }
  }
}

var start = function (request, sender, sendResponse) {

  window.startRunning = true;

  var updatePosts = document.querySelectorAll('.feed-new-update-pill__new-update-button');
  if(updatePosts.length > 0) {
    updatePosts[0].click();
  }
  var found = false;
  var posts = document.querySelectorAll('.feed-shared-update-v2');
  if(posts.length == 0) {
    shake();
    setTimeout(function () {
      start(request, sender, sendResponse);
      window.startRunning = true;
    }, 2000);
  } else {
    posts.forEach(function (element) {

      var timePeriodDiv = element.getElementsByClassName("feed-shared-actor__sub-description")[0];
      var personUrl = '';
      if(element.getElementsByClassName("feed-shared-actor__container-link")[0]) {
        personUrl = element.getElementsByClassName("feed-shared-actor__container-link")[0].getAttribute("href").split('?')[0]; 
      }
      var postsUrl = personUrl + "/detail/recent-activity/shares/";

      var timePeriod = "1d";
      if(timePeriodDiv) {
        var matchesTimePeriod = timePeriodDiv.innerText.match(timePeriod);

        var socialCounts = element.getElementsByClassName('feed-shared-social-counts')[0];
        if(socialCounts) {
          for(var i = 0; i < socialCounts.children.length; i++) {
            counter.likes = getSocialCounts(socialCounts.children[i], 'likes');
            counter.comments = getSocialCounts(socialCounts.children[i], 'comments');
          }
        }

        if(matchesTimePeriod && matchesTimePeriod.length > 0) {
          if(window.startRunning) {
            window.startRunning = false;
            if( counter.comments > 2 && counter.comments < 5 && counter.likes < 10 ) {
              console.log("likes " + counter.likes);
              console.log("comments " + counter.comments);
              console.log(postsUrl);
              location.href = postsUrl;
              found = true;
            }
          }
        }
      }

      if(found == false) {
        element.remove();
      }

    });
  }
  // window.startRunning = true;
}

console.log('crawler');
window.startRunning = false;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(!window.startRunning) {
    setInterval(function () {
      if(window.startRunning) {
        start(request, sender, sendResponse);
      }
    }, 2000);
    window.startRunning = true;
  }
})
