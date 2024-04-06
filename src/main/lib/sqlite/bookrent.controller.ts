async function existsRent(id: number) {
  try {
    // await prisma.bookTaken.findUniqueOrThrow({
    //   where: {
    //     btId: id
    //   }
    // })
    
    return true
  } catch (error) {
    return false
  }
}

export async function addNewRentBook(id: number, name: string) {
  try {
    // const book = await prisma.bookTaken.create({
    //   data: {
    //     bookId: {
    //       connect: {
    //         id
    //       }
    //     },
    //     name,
    //     status: "rented"
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

export async function editRentStatus(id: number, status: "rented" | "returned") {
  try {
    // const rentBook = await prisma.bookTaken.findUnique({
    //   where: {
    //     btId: id
    //   }
    // })

    // if (!rentBook) throw "El registro de esa prestacion no existe"

    // const newInfo: {[x:string]: any} = {
    //   status
    // }

    // status === "returned"
    //   ? newInfo.endDate = new Date()
    //   : newInfo.endDate = null

    // const newRent = await prisma.bookTaken.update({
    //   where: {
    //     btId: id
    //   },
    //   data: newInfo
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

export async function removeRent(id: number) {
  try {
    // const exists = await existsRent(id)

    // if (!exists) throw "ID de prestacion no existe"

    // await prisma.bookTaken.delete({
    //   where: {
    //     btId: id
    //   }
    // })

    return {
      success: true
    }
  } catch (error) {
    return {
      error
    }
  }
}