import { Dispatch, SetStateAction } from "react"

export interface IBooksResult {
  data: IBookDB[]
  pagination: {
    count: number
    pages: number
    current: number
  }
}

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
    books: {
      getBooks: (params: IGetBooks) => void
      handleGetBooks: (callback: (booksResult: IBooksResult) => void) => void
      closeHandleGetBooks: () => void
    }
  }
}

export {}