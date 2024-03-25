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
      prismaParams.where = {
        [params.where.attribute]: {
          contains: params.where.value
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