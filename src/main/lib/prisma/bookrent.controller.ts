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

export async function editRentStatus(id: number, status: "rented" | "returned") {
  try {
    const rentBook = await prisma.bookTaken.findUnique({
      where: {
        btId: id
      }
    })

    if (!rentBook) throw "El registro de esa prestacion no existe"

    const newInfo: {[x:string]: any} = {
      status
    }

    status === "returned"
      ? newInfo.endDate = new Date()
      : newInfo.endDate = null

    const newRent = await prisma.bookTaken.update({
      where: {
        btId: id
      },
      data: newInfo
    })

    return {
      data: newRent
    }
  } catch (error) {
    return {
      error
    }
  }
}