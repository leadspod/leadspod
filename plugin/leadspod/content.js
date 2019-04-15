
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  console.log(request);


  var posts = document.querySelectorAll('.feed-shared-update-v2');

  posts.forEach(function(element) {
    console.log(element);
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
