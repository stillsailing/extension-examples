import { useEffect, useRef, useState } from "react"

import "@/style.css"
import "./option.css"

import { Button } from "~lib/ui/button"
import { Textarea } from "~lib/ui/textarea"

function Options() {
  const [data, setData] = useState("")
  const iframeRef = useRef<HTMLIFrameElement>()

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log("EVAL output: " + event.data)
    })
  }, [])

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-4">
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      <h2>This is the Option UI page!</h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <div className=" space-y-4 my-2">
        <Textarea value={data} onChange={(e) => setData(e.target.value)} />
        <Button
          onClick={() => {
            iframeRef.current.contentWindow.postMessage("10 + 20", "*")
            chrome.runtime.sendMessage({
              type: "put_rule",
            })
          }}
          size="sm">
          Click me
        </Button>
        <Button
          className="ml-4"
          onClick={() => {
            chrome.runtime.sendMessage({
              type: "clear_rule",
            })
          }}
          size="sm">
          Clear
        </Button>
      </div>
      <iframe src="sandbox.html" ref={iframeRef} style={{ display: "none" }} />
    </div>
  )
}

export default Options
