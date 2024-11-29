import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const logger = createLogger({
  collapsed: true,
})

export const store = createStore(reducer, composeEnhancers(applyMiddleware(logger)))
