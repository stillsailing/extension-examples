import * as React from 'react'

let timer
export default function App() {
  const [value, setValue] = React.useState(5)
  const [last, setLast] = React.useState(0)

  async function update() {
    const response = await chrome.runtime.sendMessage({ type: 'get-timer' })
    setLast(+response)
    timer = setTimeout(update, 1000)
  }

  React.useEffect(() => {
    update()
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container">
      <div>剩余 {last} 秒</div>
      <input
        type="number"
        min="1"
        max="120"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />&nbsp;
      分钟
      <br />
      <button
        className="btn-set"
        onClick={() => {
          chrome.runtime.sendMessage({
            type: 'set-timer',
            payload: value * 60,
          })
        }}
      >
        Set Timer
      </button>
    </div>
  )
}
