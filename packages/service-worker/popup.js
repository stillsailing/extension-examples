const input = document.querySelector('#input-timer')

document.querySelector('#btn-set-timer').addEventListener('click', function () {
  chrome.runtime.sendMessage({
    type: 'set-timer',
    payload: {
      id: 'first-timer',
      timeout: +input.value,
    },
  })
})
