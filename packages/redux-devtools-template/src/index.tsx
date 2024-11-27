import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { store } from './store'

const App = () => {
  const state = React.useSyncExternalStore(store.subscribe, store.getState)
  return <div>
    <h3>Counter:{state}</h3>
    <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>Increment</button>
    <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>Decrement</button>
  </div>
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);