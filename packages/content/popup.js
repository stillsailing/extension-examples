const input = document.querySelector('#input-timer')
const text = document.querySelector('#timer-rest')

document.querySelector('#btn-set-timer').addEventListener('click', function () {
  chrome.runtime.sendMessage({
    type: 'set-timer',
    payload: {
      timeout: +input.value * 60,
    },
  })
})

document.addEventListener('DOMContentLoaded', function () {
  setInterval(() => updateRest(), 1000)
})

async function updateRest() {
  const rest = await chrome.runtime.sendMessage({
    type: 'get-timer',
  })
  text.innerText = +rest
}
