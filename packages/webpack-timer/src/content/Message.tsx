import * as React from 'react'
import { useStore } from './store'
import setup from './setup'

export default function Message() {
  const { messages } = useStore()

  React.useEffect(() => {
    const un = setup()
    return un
  }, [])

  return (
    <div className="timer-container">
      {messages.map((message) => (
        <div key={message.id} className="message-item">{message.text}</div>
      ))}
    </div>
  )
}
