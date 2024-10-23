import * as React from 'react'
import * as ReactDom from 'react-dom/client'
import App from './App'
import './index.css'

ReactDom.createRoot(document.querySelector('#extension-popup')).render(<App />)