// General Functions
window.allowRunning = false;

var shake = function() {
  window.scrollTo(0, document.body.scrollHeight);
  window.scrollBy(0, 100);
  window.scrollBy(0, -100);
}

var getPostIds = function() {
  var postIds = JSON.parse(localStorage.getItem("postids"));
  if (postIds == null || postIds == "") {
    postIds = [];
  }
  return postIds;
}
var addToPostIds = function(id) {
  var postIds = getPostIds();
  postIds.push(id);
  localStorage.setItem("postids", JSON.stringify(postIds));
}
var isInPostIds = function(id) {
  var postIds = getPostIds();
  if (postIds.indexOf(id) == -1) return false;
  return true;
}

var counter = {
  likes: 0,
  comments: 0,
  posts: 0
}

var getSocialCounts = function(child, kind) {
  var re = new RegExp(kind, 'gi')
  var matches = child.innerText.match(re)
  if (matches && matches.length > 0) {
    var nr = child.innerText.split(' ')[0];

    var reactions = nr.split("\n");
    if (reactions.length > 1) {
      nr = reactions[0].trim();
    }
    // If the number has a "," delete it
    nr = nr.replace(/\,/g, '');
    return parseInt(nr, 10);
  }
  return 0;
}

var roundToTwo = function(num) {
  return +(Math.round(num + "e+2") + "e-2");
}
console.log('init crawler');
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (!window.allowRunning) {
    setInterval(function() {
      if (window.allowRunning) {
        start(request, sender, sendResponse);
      }
    }, 2000);
    window.allowRunning = true;
  }
})

var start = function(request, sender, sendResponse) {
  if (window.location.href.indexOf('feed') > 0) {
    loopFeed(request, sender, sendResponse);
  } else {
    alert("Please go to LinkedIn Home Page to use this function");
  }
}

window.onload = function(e) {
  if (window.location.href.indexOf('recent-activity/shares') > 0) {
    if (!window.allowRunning) {
      setInterval(function() {
        if (window.allowRunning) {
          loopRecentPosts();
        }
      }, 2000);
      window.allowRunning = true;
    }
  } else if (window.location.href.indexOf('detail/contact-info') > 0) {
    if (!window.allowRunning) {
      setInterval(function() {
        if (window.allowRunning) {
          getContactEmail();
        }
      }, 2000);
      window.allowRunning = true;
    }
  }
}

// When you're on recent posts
var loopRecentPosts = function() {
  var posts = document.querySelectorAll('.feed-shared-update-v2');
  var followers = document.querySelectorAll('.pv-recent-activity-top-card__extra-info .text-align-right')[0].innerText;
  // If the number has a "," delete it
  followers = followers.replace(/\,/g, '');
  var followersNumber = parseInt(followers, 10);
  var firstName = $('.pv-recent-activity-top-card__info .single-line-truncate').html();
  firstName = firstName.replace('<!---->', '');

  if (posts.length == 0) {
    shake();
  } else {
    posts.forEach(function(element) {
      var socialCounts = element.getElementsByClassName('social-details-social-counts--justified')[0];
      if (socialCounts) {
        for (var i = 0; i < socialCounts.children.length; i++) {
          counter.likes = counter.likes + getSocialCounts(socialCounts.children[i], 'Reactions');
          counter.comments = counter.comments + getSocialCounts(socialCounts.children[i], 'comments');
        }
      }
      if (counter.posts == 10) {
        if (window.allowRunning) {
          window.allowRunning = false;

          var averageComments = counter.comments / counter.posts;
          var averageLikes = counter.likes / counter.posts;

          var engagementIndex = ((counter.comments + counter.likes) / followersNumber) * 100;
          var linkedinUrl = location.href;

          var personUrl = '';

          if ($('.feed-shared-actor__container-link')) {
            personUrl = $('.feed-shared-actor__container-link').attr("href").split('?')[0];
          }

          var contactInfoUrl = personUrl + "/detail/contact-info";


          localStorage.removeItem("firstName");
          localStorage.removeItem("linkedinUrl");
          localStorage.removeItem("averageComments");
          localStorage.removeItem("averageLikes");
          localStorage.removeItem("engagementIndex");

          console.log("Posts: " + counter.posts);
          console.log("Likes: " + counter.likes);
          console.log("Comments: " + counter.comments);
          console.log("Average comments per post: " + averageComments);
          console.log("Average likes per post: " + averageLikes);
          console.log("Engagement Index: " + roundToTwo(engagementIndex) + "%");

          localStorage.setItem("firstName", firstName);
          localStorage.setItem("linkedinUrl", linkedinUrl);
          localStorage.setItem("averageComments", averageComments);
          localStorage.setItem("averageLikes", averageLikes);
          localStorage.setItem("engagementIndex", engagementIndex);

          location.href = contactInfoUrl;

          //location.reload();
        }
      } else {
        element.remove();
        counter.posts++;
      }
    });
  }
}

// When you're on a home feed
var loopFeed = function(request, sender, sendResponse) {
  window.allowRunning = true;

  var updatePosts = document.querySelectorAll('.feed-new-update-pill__new-update-button');
  if (updatePosts.length > 0) {
    updatePosts[0].click();
  }
  var found = false;
  var posts = document.querySelectorAll('.feed-shared-update-v2');
  if (posts.length == 0) {
    shake();
    setTimeout(function() {
      start(request, sender, sendResponse);
      window.allowRunning = true;
    }, 2000);
  } else {
    posts.forEach(function(element) {

      var timePeriodDiv = element.getElementsByClassName("feed-shared-actor__sub-description")[0];
      var personUrl = '';
      if (element.getElementsByClassName("feed-shared-actor__container-link")[0]) {
        personUrl = element.getElementsByClassName("feed-shared-actor__container-link")[0].getAttribute("href").split('?')[0];
      }
      var postsUrl = personUrl + "/detail/recent-activity/shares/";
      var contactInfoUrl = personUrl + "/detail/contact-info";

      var timePeriod = "1d";
      if (timePeriodDiv) {
        var matchesTimePeriod = timePeriodDiv.innerText.match(timePeriod);

        //Doesn't exist!!!! Name feed-shared-social-counts needs to be changed.
        var socialCounts = element.getElementsByClassName('social-details-social-counts--justified')[0];
        if (socialCounts) {
          for (var i = 0; i < socialCounts.children.length; i++) {
            counter.likes = getSocialCounts(socialCounts.children[i], 'Reactions');
            counter.comments = getSocialCounts(socialCounts.children[i], 'comments');
          }
        }

        if (matchesTimePeriod && matchesTimePeriod.length > 0) {
          if (window.allowRunning) {
            window.allowRunning = false;
            if (counter.comments < 10 && counter.likes < 20) {
              // console.log("likes " + counter.likes);
              // console.log("comments " + counter.comments);
              // console.log(postsUrl);

              var id = element.getElementsByClassName('lazy-image')[0].alt; //.dataset.columns; //$('.feed-shared-actor__name').getAttribute('data-entity-hovercard-id');

              if (!isInPostIds(id)) {
                addToPostIds(id);
                location.href = postsUrl;
                found = true;
              }
            }
          }
        }
      }

      if (found == false) {
        element.remove();
      }
    });
  }
}

var getContactEmail = function() {
  if (window.allowRunning) {
    window.allowRunning = false;
  }
  console.log("contact email");
  var emailDiv = $('.pv-contact-info__contact-type.ci-email');
  var userEmail = 'NO EMAIL';
  if (emailDiv) {
    userEmail = $('.pv-contact-info__contact-type.ci-email .pv-contact-info__contact-link').text();
  }

  var firstName = localStorage.getItem("firstName");
  var linkedinUrl = localStorage.getItem("linkedinUrl");
  var averageComments = localStorage.getItem("averageComments");
  var averageLikes = localStorage.getItem("averageLikes");
  var engagementIndex = localStorage.getItem("engagementIndex");

  setTimeout(function() {
    console.log(firstName);
    console.log(linkedinUrl);
    console.log(averageComments);
    console.log(averageLikes);
    console.log(engagementIndex);
  }, 1000);


  //sendToExcel(firstName, linkedinUrl, averageComments, averageLikes, engagementIndex, userEmail);

}


var sendToExcel = function(firstname, linkedinurl, averagecomments, aveargelikes, engagementindex, useremail) {


  //simple validation at client's end
  //we simply change border color to red if empty field using .css()
  var proceed = true;

  //everything looks good! proceed...
  if (proceed) {
    //data to be sent to server
    post_data = {
      'firstname': firstname,
      'useremail': useremail,
      'linkedinurl': linkedinurl,
      'averagecomments': averagecomments,
      'aveargelikes': aveargelikes,
      'engagementindex': engagementindex
    };

    var url = 'https://script.google.com/macros/s/AKfycbxJJ0S3-8SaO6V13wYYqKoMyl6LZi_VsR03z3I1FMq1Xqn5_iA/exec';
    var jqxhr = $.post(url, post_data, function(post_data) {
        setTimeout(function() {
          console.log("Yes!");
        }, 500);
      })
      .fail(function(data) {
        setTimeout(function() {
          alert("Some problem occured :(")
        }, 500);
      });
  }

  return false;
}
