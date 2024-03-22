declare global {
  interface Window {
    windowAct: {
      close: () => void
      maximize: () => void
      minimize: () => void
    }
  }
}

export {}