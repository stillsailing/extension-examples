import * as React from 'react'

export default function App() {
  const [count, setCount] = React.useState(0)
  return (
    <div class="container">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}