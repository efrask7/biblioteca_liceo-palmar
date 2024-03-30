import { PrismaClient } from "../../../main/database/generated/client";

const prisma = new PrismaClient()

export async function addNewRentBook(id: number, name: string) {
  try {
    const book = await prisma.bookTaken.create({
      data: {
        bookId: {
          connect: {
            id
          }
        },
        name,
        status: "rented"
      }
    })

    return {
      success: true,
      data: book
    }
  } catch (error) {
    return {
      error
    }
  }
}