import { Args } from "../../database/generated/client/runtime/library";
import { PrismaClient } from "../../database/generated/client";
import { isJsonNull } from "../excel/utils";

const prisma = new PrismaClient()

export async function importExcel(books: IBook[]) {
  await prisma.$transaction(async (db) => {
    for (let book of books) {
      if (isJsonNull(book)) return
      try {
        await db.books.create({
          data: book
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
}

export async function getBooks({ params }: IGetBooks) {
  try {
    const order = {
      [params.orderBy ?? "id"]: params.order.toLowerCase() ?? "asc"
    }
      
    const prismaParams: Args<"Books", "findMany">  = {
      orderBy: order,
      take: params.limit,
      skip: params.limit * (params.offset - 1),
    }
    
    if (params.where) {
      if (params.where.attribute === "id") {
        prismaParams.where = {
          id: Number(params.where.value)
        }
      } else {
        prismaParams.where = {
          [params.where.attribute]: {
            contains: params.where.value
          }
        }
      }
    }

    // const countBooks = await prisma.books.count()
    
    const books = await prisma.books.findMany(prismaParams)
    
    let countBooks = 0

    params.where
    ?
    countBooks = books.length
    :
    countBooks = await prisma.books.count()
  
    const allPages = countBooks / params.limit
    
    return {
      data: books as IBookDB[],
      pagination: {
        count: countBooks,
        pages: allPages,
        current: params.offset
      }
    }
  } catch (error) {
    return {
      error
    }
  }
}

export async function getBookById(id: number) {
  try {
    if (isNaN(id)) throw "El id no es valido"
    const book = await prisma.books.findUnique({
      where: {
        id
      }
    })

    if (!book) throw `No se encontro un libro con el id ${id}`

    const bookRented = await prisma.bookTaken.findMany({
      where: {
        id
      },
      orderBy: {
        btId: "desc"
      }
    })

    return {
      data: {
        book,
        rented: bookRented
      }
    }
  } catch (error) {
    return {
      error
    }
  }
}

export async function updateBook(id: number, data: IBook) {
  try {
    if (isNaN(id)) throw "El id no es valido"
    const updatedBook = await prisma.books.update({
      where: {
        id
      },
      data
    })

    return {
      data: updatedBook
    }
  } catch (error) {
    return {
      error
    }
  }
}

export async function deleteBook(id: number) {
  try {
    if (isNaN(id)) throw "El id no es valido"
    const deletedBook = await prisma.books.delete({
      where: {
        id
      }
    })

    await prisma.bookTaken.deleteMany({
      where: {
        id
      }
    })

    return {
      success: true,
      data: deletedBook
    }
  } catch (error) {
    return {
      error
    }
  }
}
