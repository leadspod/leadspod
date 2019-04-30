// document.addEventListener('DOMContentLoaded', function () {
//
//   document.querySelector('#start-btn')
//     .addEventListener('click', onclick, false)
//
//   function onclick() {
//     chrome.tabs.query({
//       currentWindow: true,
//       active: true
//     }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, 'hiho', null);
//     })
//   }
// }, false)




// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener){
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}

var iframeSource = 'iframe.html';

// Create the iframe
// var iframe = document.createElement('iframe');
// iframe.setAttribute('src', iframeSource);
// iframe.setAttribute('id', 'the_iframe2');
// iframe.style.width = 450 + 'px';
// iframe.style.height = 200 + 'px';
// document.body.appendChild(iframe);

// Send a message to the child iframe
var iframeEl = document.getElementById('the_iframe'),
    messageButton = document.getElementById('message_button'),
    results = document.getElementById('results');


// Send a message to the child iframe
var sendMessage = function(msg) {
    // Make sure you are sending a string, and to stringify JSON
    iframeEl.contentWindow.postMessage(msg, '*');
};

// Send random messge data on every button click
bindEvent(messageButton, 'click', function (e) {
    var random = Math.random();
    sendMessage('' + random);
});

// Listen to message from child window
bindEvent(window, 'message', function (e) {
    results.innerHTML = e.data;
});
