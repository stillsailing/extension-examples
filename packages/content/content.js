console.log('Content Script Example')

let counting = document.visibilityState === 'visible'
let target = 0
let reduce = 0
let setupStamp
let lastStamp

function setup() {
  reset()
  setupStamp = Date.now()
  lastStamp = setupStamp
  chrome.runtime.sendMessage({ type: 'get-timer' }, (response) => {
    target = +response * 1000 // seconds => milliseconds
  })
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'setup') {
    setup()
  }
})

document.addEventListener('visibilitychange', () => {
  counting = document.visibilityState === 'visible'
  if (document.visibilityState === 'visible') {
    lastStamp = Date.now()
  }
})

function flush() {
  const now = Date.now()
  reduce += now - lastStamp
  lastStamp = now
  chrome.runtime.sendMessage({
    type: 'update-timer',
    payload: Math.round((target - reduce) / 1000),
  })
}

function check() {
  if (reduce > target) {
    const message = `你已在当前页面停留了 ${target / 1000} 秒，到达设定时间`
    alert(message)
    reset()
  }
}

function reset() {
  reduce = 0
  target = 0
  setupStamp = null
  lastStamp = null
}

setInterval(() => {
  if (setupStamp && counting) {
    flush()
    check()
  }
}, 1000)
