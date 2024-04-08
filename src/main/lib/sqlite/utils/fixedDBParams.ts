export const dBParamsFixed: {
  [key in TBookParamDB]: string
} = {
  id: 'id',
  titulo: 'title',
  autor: 'author',
  cantidad: 'quantity',
  editorial: 'publisher',
  fecha: 'book_date',
  observaciones: 'observations',
  orden: 'orderBk',
  origen: 'origin',
  volumen: 'volume'
}

export function fixBookDBJson(book: IBookSQDB): IBookDB {
  const { id, author, book_date, observations, orderBk, origin, publisher, quantity, title, volume } = book
  
  return {
    id,
    titulo: title || "",
    autor: author || "",
    cantidad: quantity || "",
    editorial: publisher || "",
    fecha: book_date || "",
    observaciones: observations || "",
    orden: orderBk || "",
    origen: origin || "",
    volumen: volume || ""
  }
}