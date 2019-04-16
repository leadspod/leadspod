
var getDeleteButton = function(){
  var button = document.createElement("button");
  button.innerHTML = "Delete";
  // 3. Add event handler
  button.addEventListener ("click", function() {
    console.log(this);
    this.parentElement.remove();
  });
  return button;
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  console.log(request);


  var posts = document.querySelectorAll('.feed-shared-update-v2');

  posts.forEach(function(element) {
    console.log(element);
    //feed-shared-update-v2__description

    var targetDiv = element.getElementsByClassName("feed-shared-update-v2__description")[0];
    console.log(element.innerText);

    var re = new RegExp(request, 'gi')
    var matches = targetDiv.innerText.match(re)
    if(matches && matches.length > 0){
      var deleteButton = getDeleteButton();
      element.appendChild(deleteButton);
    }else{
      element.remove();
      window.scrollBy(0, 100);
      window.scrollBy(0, -100);
    }



  });


   //sendResponse({count: matches.length})
})




const re = new RegExp('Promoted', 'gi')
const matches = document.documentElement.innerHTML.match(re)
if(matches && matches.length > 0){
  chrome.runtime.sendMessage({
    url: window.location.href,
    count: matches.length
  })
}
