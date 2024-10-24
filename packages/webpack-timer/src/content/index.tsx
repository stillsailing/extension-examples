import { createPortal } from 'react-dom'
import * as React from 'react'
import Message from './Message'
import cssText from '!!raw-loader!./style.css'

const style = document.createElement('style')
style.textContent = cssText
document.head.appendChild(style)

function getRoot() {
  const id = 'extension-timer-message-root'
  if (document.getElementById(id)) {
    return document.getElementById(id)
  }
  const root = document.createElement('div')
  root.id = id
  document.body.appendChild(root)
  return root
}

createPortal(<Message />, getRoot())
