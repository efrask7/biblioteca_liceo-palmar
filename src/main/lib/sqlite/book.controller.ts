import { isJsonNull } from "../excel/utils";
import Database from "better-sqlite3";
import { getDB } from "./db.controller";
import { dBParamsFixed, fixBookDBJson } from "./utils/fixedDBParams";

export async function importExcel(books: IBook[]) {
  // const excel = await prisma.$transaction(async (db) => {
  //   for (const book of books) {
  //     if (isJsonNull(book)) return
  //     try {
  //       await db.books.create({
  //         data: book
  //       })
  //     } catch (error) {
  //       console.log(error)
  //       return {
  //         error
  //       }
  //     }
  //   }

  //   return {
  //     success: true
  //   }
  // })
  // console.log("Excel importExcel status", excel)

  // if (excel && !excel.success) return { error: excel.error }
  
  // return {
  //   success: true
  // }
  try {
    const db = new Database("bib.db", {
      fileMustExist: true
    })

    const insert = db.prepare('INSERT INTO Books (title, author, orderBk, volume, publisher, book_date, origin, observations, quantity) VALUES (@titulo, @autor, @orden, @volumen, @editorial, @fecha, @origen, @observaciones, @cantidad)')

    const insertMany = db.transaction((booksData) => {
      for (const book of booksData) {
        if (isJsonNull(book)) return
        insert.run(book)
      }
    })

    insertMany(books)

    return {
      success: true
    }
  } catch (error) {
    return {
      error
    }
  }
}

export async function getBooks({ params }: IGetBooks) {
  try {

    let query = "SELECT * FROM Books"

    if (params.where) {
      if (params.where.attribute === "id") {
        query += ` WHERE id = ${params.where.value}`
      } else {
        query += ` WHERE ${params.where.attribute} LIKE '%${params.where.value}%'`
      }
    }

    if (params.orderBy) {
      query += ` ORDER BY ${dBParamsFixed[params.orderBy]} ${params.order}`
    }

    if (params.offset) {
      query += ` LIMIT 10 OFFSET ${(params.offset-1) * 10}`
    } else query += " LIMIT 10;"
    
    const db = getDB()

    const result = db.prepare(query).all()

    const resultMapped = result.map(res => fixBookDBJson(res as IBookSQDB))

    const count = params.where ? result.length : (db.prepare("SELECT * FROM Books").all()).length
    const allCount = count / 10

    return {
      data: resultMapped,
      pagination: {
        count,
        pages: allCount,
        current: params.offset
      }
    }
    // const order = {
    //   [params.orderBy ?? "id"]: params.order.toLowerCase() ?? "asc"
    // }
      
    // const prismaParams: Args<"Books", "findMany">  = {
    //   orderBy: order,
    //   take: params.limit,
    //   skip: params.limit * (params.offset - 1),
    // }
    
    // if (params.where) {
    //   if (params.where.attribute === "id") {
    //     prismaParams.where = {
    //       id: Number(params.where.value)
    //     }
    //   } else {
    //     prismaParams.where = {
    //       [params.where.attribute]: {
    //         contains: params.where.value
    //       }
    //     }
    //   }
    // }

    // // const countBooks = await prisma.books.count()
    
    // const books = await prisma.books.findMany(prismaParams)
    
    // let countBooks = 0

    // params.where
    // ?
    // countBooks = books.length
    // :
    // countBooks = await prisma.books.count()
  
    // const allPages = countBooks / params.limit
    
    // return {
    //   data: books as IBookDB[],
    //   pagination: {
    //     count: countBooks,
    //     pages: allPages,
    //     current: params.offset
    //   }
    // }
  } catch (error) {
    return {
      error
    }
  }
}

export async function getBookById(id: number) {
  try {
    if (isNaN(id)) throw "El id no es valido"

    const db = getDB()

    const book = db.prepare("SELECT * FROM Books WHERE id = ?").get(id)

    if (!book) throw `No se encontro un libro con el id ${id}`

    const bookFix = fixBookDBJson(book as IBookSQDB)

    const rented = db.prepare("SELECT * FROM BookRent WHERE book = ? ORDER BY id DESC").all(id)

    return {
      data: {
        book: bookFix,
        rented
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
    // const updatedBook = await prisma.books.update({
    //   where: {
    //     id
    //   },
    //   data
    // })

    return {
      data: {}
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
    // const deletedBook = await prisma.books.delete({
    //   where: {
    //     id
    //   }
    // })

    // await prisma.bookTaken.deleteMany({
    //   where: {
    //     id
    //   }
    // })

    return {
      success: true,
      data: {}
    }
  } catch (error) {
    return {
      error
    }
  }
}

export async function addBook(data: IBook) {
  try {
    // const addedBook = await prisma.books.create({
    //   data
    // })

    return {
      success: true,
      data
    }
  } catch (error) {
    return {
      error
    }
  }
}

export async function deleteAllData() {
  try {
    // await prisma.books.deleteMany()
    // await prisma.bookTaken.deleteMany()

    return {
      success: true,
    }
  } catch (error) {
    return {
      error
    }
  }
}