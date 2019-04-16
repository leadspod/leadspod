
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  console.log(request);


  var posts = document.querySelectorAll('.feed-shared-update-v2');

  posts.forEach(function(element) {
    console.log(element);
    //feed-shared-update-v2__description

    //var targetDiv = element.getElementsByClassName("feed-shared-update-v2__description")[0];
    console.log(element.innerText);

    const re = new RegExp('Promoted', 'gi')
    const matches = element.innerText.match(re)
    if(matches && matches.length > 0){
      element.remove();
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
