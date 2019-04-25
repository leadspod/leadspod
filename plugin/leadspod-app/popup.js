chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log('popup got', msg, 'from', sender);
    sendResponse('response');
});

var iframePort; // in case you want to alter its behavior later in another function

chrome.runtime.onConnect.addListener(function(port) {
    iframePort = port;
    port.onMessage.addListener(function(msg, port) {
        console.log(msg);
    });
    port.postMessage('from-popup');
});
