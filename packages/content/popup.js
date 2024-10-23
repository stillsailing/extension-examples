const input = document.querySelector('#input-timer')
const text = document.querySelector('#timer-rest')

document.querySelector('#btn-set-timer').addEventListener('click', function () {
  chrome.runtime.sendMessage({
    type: 'set-timer',
    payload: +input.value * 60,
  })
})

document.addEventListener('DOMContentLoaded', function () {
  update()
})

async function update() {
  const response = await chrome.runtime.sendMessage({ type: 'get-timer' })
  text.textContent = +response
  setTimeout(update, 1000)
}
