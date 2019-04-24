document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['key'], function (result) {
    if(result.key) {
      document.querySelector('#keyword')
        .value = result.key;
    }
  });
  document.querySelector('#start-btn')
    .addEventListener('click', onclick, false)

  function onclick() {
    chrome.tabs.query({
      currentWindow: true,
      active: true
    }, function (tabs) {
      var keyword = document.querySelector('#keyword')
        .value;
      chrome.tabs.sendMessage(tabs[0].id, keyword, null)
      chrome.storage.local.set({
        key: keyword
      }, function () {});
    })
  }
}, false)
