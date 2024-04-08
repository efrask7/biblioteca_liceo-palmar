type TBookParam = "orden" | "autor" | "titulo" | "volumen" | "editorial" | "fecha" | "origen" | "observaciones" | "cantidad"

interface IBook {
  orden?: string
  autor?: string
  titulo?: string
  volumen?: string
  editorial?: string
  fecha?: string
  origen?: string
  observaciones?: string
  cantidad?: string
}

interface IBookDB extends IBook {
  id: number
}

interface IBookRent {
  id: number
  book: number
  name: string
  status: "rented" | "returned"
  startDate: Date
  endDate?: Date
}