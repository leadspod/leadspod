chrome.runtime.sendMessage('test', function(response) {
    console.log(response);
);

var port = chrome.runtime.connect({name: 'test'});
port.onMessage.addListener(function(msg, port) {
    console.log(msg);
});
port.postMessage('from-iframe');
