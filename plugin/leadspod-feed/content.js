var getPostIds = function () {
  var postIds = JSON.parse(localStorage.getItem("postids"));
  if(postIds == null || postIds == "") {
    postIds = [];
  }
  return postIds;
}
var addToPostIds = function (id) {
  var postIds = getPostIds();
  postIds.push(id);
  localStorage.setItem("postids", JSON.stringify(postIds));
}
var isInPostIds = function (id) {
  var postIds = getPostIds();
  if(postIds.indexOf(id) == -1) return false;
  return true;
}
var getDeleteButton = function () {
  var button = document.createElement("button");
  button.innerHTML = "Delete";
  button.style.position = "absolute";
  button.style.marginTop = "-21px";
  button.classList.add("delete-button");
  button.addEventListener("click", function () {
    var post = this.parentElement;
    var id = post.parentElement.getAttribute('data-id');
    addToPostIds(id);
    post.remove();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    window.startRunning = true;
  });
  return button;
}
var shake = function () {
  window.scrollBy(0, 100);
  window.scrollBy(0, -100);
}
var start = function (request, sender, sendResponse) {
  var updatePosts = document.querySelectorAll('.feed-new-update-pill__new-update-button');
  if(updatePosts.length > 0) {
    updatePosts[0].click();
  }
  var posts = document.querySelectorAll('.feed-shared-update-v2');
  if(posts.length == 0) {
    shake();
    setTimeout(function () {
      start(request, sender, sendResponse);
    }, 2000);
  } else {
    posts.forEach(function (element) {
      var targetDiv = element.getElementsByClassName("feed-shared-update-v2__description")[0];
      var re = new RegExp(request, 'gi')
      var matches = targetDiv.innerText.match(re)
      var id = element.parentElement.getAttribute('data-id');
      if(matches && matches.length > 0 && !isInPostIds(id)) {
        var button = element.getElementsByClassName("delete-button");
        if(button.length == 0) {
          var deleteButton = getDeleteButton();
          element.insertBefore(deleteButton, element.firstChild);
          element.style.border = "thick solid red";
          element.style.marginBottom = "20px";
          window.startRunning = false;
        }
      } else {
        element.remove();
        //shake();
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
