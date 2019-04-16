window.postIds = [];

var getDeleteButton = function () {
  var button = document.createElement("button");
  button.innerHTML = "Delete";
  button.classList.add("delete-button");
  button.addEventListener("click", function () {
    var post = this.parentElement;
    window.postIds.push(post.parentElement.getAttribute('data-id'));
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
    }, 3000);
  }
  posts.forEach(function (element) {
    var targetDiv = element.getElementsByClassName("feed-shared-update-v2__description")[0];
    var re = new RegExp(request, 'gi')
    var matches = targetDiv.innerText.match(re)
    // && window.postIds.indexOf(element.getAttribute('data-id')) == -1
    var id = element.parentElement.getAttribute('data-id');
    if(matches && matches.length > 0) {
      var button = element.getElementsByClassName("delete-button");
      if(button.length == 0) {
        var deleteButton = getDeleteButton();
        element.appendChild(deleteButton);
        element.style.border = "thick solid red";
        window.startRunning = false;
      }
    } else {
      element.remove();
      shake();
    }
  });
}
window.startRunning = false;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(!window.startRunning) {
    setInterval(function () {
      if(window.startRunning) {
        start(request, sender, sendResponse);
      }
    }, 3000);
    window.startRunning = true;
  }
})
