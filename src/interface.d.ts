import { Dispatch, SetStateAction } from "react"

declare global {
  interface Window {
    windowAct: {
      close: () => void
      maximize: () => void
      minimize: () => void
      handleChange: (state: Dispatch<SetStateAction<boolean>>) => void
      closeHandleChange: () => void
    }
    files: {
      open: () => void
    }
  }
}

export {}