
var getDeleteButton = function(){
  var button = document.createElement("button");
  button.innerHTML = "Delete";
  button.classList.add("delete-button");
  button.addEventListener ("click", function() {
    this.parentElement.remove();
  });
  return button;
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var posts = document.querySelectorAll('.feed-shared-update-v2');
  posts.forEach(function(element) {
    var targetDiv = element.getElementsByClassName("feed-shared-update-v2__description")[0];
    var re = new RegExp(request, 'gi')
    var matches = targetDiv.innerText.match(re)
    if(matches && matches.length > 0){
      var button = element.getElementsByClassName("delete-button");
      if(button.length == 0){
        var deleteButton = getDeleteButton();
        element.appendChild(deleteButton);
        element.style.border = "thick solid red";
      }
    }else{
      element.remove();
      window.scrollBy(0, 100);
      window.scrollBy(0, -100);
    }
  });
})




const re = new RegExp('Promoted', 'gi')
const matches = document.documentElement.innerHTML.match(re)
if(matches && matches.length > 0){
  chrome.runtime.sendMessage({
    url: window.location.href,
    count: matches.length
  })
}
