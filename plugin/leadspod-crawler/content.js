var shake = function () {
  window.scrollTo(0, document.body.scrollHeight);
  window.scrollBy(0, 100);
  window.scrollBy(0, -100);
}
var counter = {
  likes: 0,
  comments: 0,
  posts: 0
}
var getSocialCounts = function (child, kind) {
  var re = new RegExp(kind, 'gi')
  var matches = child.innerText.match(re)
  if(matches && matches.length > 0) {
    var nr = child.innerText.split(' ')[0];
    nr = nr.replace(/\,/g,'');
    return parseInt(nr,10);
  }
  return 0;
}

var roundToTwo = function(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

var startIndex = function(){
  var posts = document.querySelectorAll('.feed-shared-update-v2');
  window.startRunning = true;
  var followers = document.querySelectorAll('.pv-recent-activity-top-card__follower-count')[0].innerText.split(' ')[0];
  followers = followers.replace(/\,/g,'');
  var followersNumber=parseInt(followers,10);

  if(posts.length == 0) {
    shake();
    setTimeout(function () {
      // start(request, sender, sendResponse);
      window.startRunning = true;
    }, 2000);
  } else {

    posts.forEach(function (element) {
      var timePeriodDiv = element.getElementsByClassName("feed-shared-actor__sub-description")[0];
      // console.log(timePeriodDiv.innerText);
      // console.log(counter.posts);
      var socialCounts = element.getElementsByClassName('feed-shared-social-counts')[0];
      if(socialCounts) {
        for(var i = 0; i < socialCounts.children.length; i++) {
          counter.likes = counter.likes + getSocialCounts(socialCounts.children[i], 'likes');
          counter.comments = counter.comments + getSocialCounts(socialCounts.children[i], 'comments');
        }
      }
      // var re = new RegExp('gi')
      // var matches = timePeriodDiv.innerText.match(re)
      if(counter.posts >= 10) {
        if(window.startRunning) {
          window.startRunning = false;
          // alert("posts : " + counter.posts + "\n" + "likes : " + counter.likes + "\n" + "comments : " + counter.comments + "");
          
          var averageComments = counter.comments / counter.posts;
          var averageLikes = counter.likes / counter.posts;

          var engagementIndex = ((counter.comments + counter.likes)/followersNumber)*100;

          console.log("Posts: " + counter.posts);
          console.log("Likes: " + counter.likes);
          console.log("Comments: " + counter.comments);
          console.log("Average comments per post: " + averageComments);
          console.log("Average likes per post: " + averageLikes);
          console.log("Engagement Index: " + roundToTwo(engagementIndex)+"%");

          //location.reload();
        }
      } else {
        element.remove();
        counter.posts++;
      }
    });
  }
}

window.onload = function(e) {
  if(window.location.href.indexOf('recent-activity/shares') > 0) {


    if(!window.startRunning) {
      setInterval(function () {
        if(window.startRunning) {
          startIndex();
        }
      }, 2000);
      window.startRunning = true;
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
            if( counter.comments < 10 && counter.likes < 20 ) {
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
