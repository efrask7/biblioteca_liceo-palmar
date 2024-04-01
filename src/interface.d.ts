import { Dispatch, SetStateAction } from "react"
import { IRentData } from "./pages/books/RentBookModal"

export interface IBooksResult {
  data: IBookDB[]
  pagination: {
    count: number
    pages: number
    current: number
  }
}

export interface IBookByIdResult {
  data: {
    book: IBookDB,
    rented: IBookRent[]
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
      getById: (id: number) => void
      handleGetBookById: (callback: (booksResult: IBookByIdResult) => void) => void
      closeHandleGetBookById: () => void
    }
    rent: {
      addRent: (params: Omit<IRentData, "bookName">) => void
      handleAddRent: (callback: (result: APIResponse) => void) => void
      closeHandleAddRent: () => void
      editRent: (params: IRentEdit) => void
      handleEditRent: (callback: (result: IRentEditRes) => void) => void
      closeHandleEditRent: () => void
      deleteRent: (id: number) => void
      handleDeleteRent: (callback: (result: APIResponse) => void) => void
      closeHandleDeleteRent: () => void
    }
  }
}

export interface IModalProps {
  open: boolean
  close: () => void
}

export {}