document.addEventListener('DOMContentLoaded', function () {

  // const bg = chrome.extension.getBackgroundPage()
  // Object.keys(bg.leadspod).forEach(function (url) {
  //   const div = document.createElement('div')
  //   div.textContent = `${url}: ${bg.leadspod[url]}`
  //   document.body.appendChild(div)
  // })

  document.querySelector('button').addEventListener('click', onclick, false)

  function onclick () {
   chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
     var keyword = document.querySelector('#keyword').value;
     chrome.tabs.sendMessage(tabs[0].id, keyword, null)
   })
  }

  // function setCount (res) {
  //  const div = document.createElement('div')
  //  div.textContent = `${res.count} bears`
  //  document.body.appendChild(div)
  // }

}, false)
