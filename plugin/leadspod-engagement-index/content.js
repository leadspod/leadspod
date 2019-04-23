var counter = {
  posts: 0,
  likes: 0,
  comments: 0
}
var shake = function () {
  window.scrollTo(0, document.body.scrollHeight);
  window.scrollBy(0, 100);
  window.scrollBy(0, -100);
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
var start = function (request, sender, sendResponse) {
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
      console.log(timePeriodDiv.innerText);
      var socialCounts = element.getElementsByClassName('feed-shared-social-counts')[0];
      if(socialCounts){
        for(var i = 0; i < socialCounts.children.length; i++) {
          var child = socialCounts.children[i];
          console.log(child);
          counter.likes = counter.likes + getSocialCounts(child, 'likes');
          counter.comments = counter.comments + getSocialCounts(child, 'comments');
        }
      }
      var re = new RegExp(request, 'gi')
      var matches = timePeriodDiv.innerText.match(re)
      if(matches && matches.length > 0) {
        if(window.startRunning){
          console.log("Nr of posts : " + counter.posts);
          console.log("Nr of likes : " + counter.likes);
          console.log("Nr of comments : " + counter.comments);
          alert("Nr of posts : " + counter.posts + "" + "Nr of likes : " + counter.likes +"" + "Nr of comments : " + counter.comments +"");
        }
        window.startRunning = false;
      } else {
        element.remove();
        counter.posts++;
      }
    });
  }
}
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