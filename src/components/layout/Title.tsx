import { useEffect } from "react"
import { APP_VERSION } from "../../utils/info"

export default function Title() {

  useEffect(() => {
    window.document.title = `Biblioteca Palmar (${APP_VERSION})`
  }, [])

  return (
    <div className="select-none flex-1 drag-head flex items-center">
      <h1>Biblioteca Palmar ({APP_VERSION})</h1>
    </div>
  )
}