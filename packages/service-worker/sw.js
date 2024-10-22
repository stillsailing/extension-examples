console.log('Service Worker Script')

const timers = []

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.type === 'get-timer') {
    sendResponse(timers)
  }
  if (request.type === 'set-timer') {
    const { id, timeout } = request.payload
    await chrome.alarms.create(id, { delayInMinutes: timeout })
    console.log(`Timer ${id} has been set. timeout: ${timeout} minutes`)
    timers.push({ id })
  }
  if (request.type === 'clear-timer') {
    const { id } = request.payload
    const index = timers.findIndex((timer) => timer.id === id)
    clearTimeout(timers[index].timer)
    console.log(`Timer ${id} has been cleared`)
    timers.splice(index, 1)
  }
})

function ringTheBell(timer) {
  const { id, timeout } = timer
  console.log(`Timer ${id} has expired after ${timeout} minutes`)
}

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(`Alarm ${alarm.name} has been triggered`)
})
