import { existsBook } from "./book.controller"
import { getDB } from "./db.controller"

export function existsRent(id: number) {
  try {
    const db = getDB()
    const stmt = db.prepare("SELECT id FROM BookRent WHERE id = ?")
    const res = stmt.get(id)

    if (!res) throw "No se encontro el registro"

    return true
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

function getRentID(id: number) {
  try {
    const db = getDB()
    const stmt = db.prepare("SELECT * FROM BookRent WHERE id = ?")
    const res = stmt.get(id)

    if (!res) throw "No se encontro el registro"

    return {
      data: res
    }
  } catch (error) {
    return {
      error
    }
  }
}

export async function addNewRentBook(id: number, name: string) {
  try {

    if (!existsBook) throw "El libro no existe"

    const db = getDB()

    const stmt = db.prepare("INSERT INTO BookRent (book, name, status, startDate) VALUES (?,?,?,?)")
    const res = stmt.run(id, name, "rented", `${new Date()}`)

    console.log("New rent at", new Date())

    if (res.changes === 0) throw "No se pudo agregar el registro"

    const data = getRentID(res.lastInsertRowid as number)

    return {
      success: true,
      data
    }
  } catch (error) {
    console.log(error)
    return {
      error
    }
  }
}

export async function editRentStatus(id: number, status: "rented" | "returned") {
  try {
    const db = getDB()
    const stmt = db.prepare("UPDATE BookRent SET status = ?, endDate = ? WHERE id = ?")

    const endDate = status === "rented" ? null : new Date().toISOString()
    const res = stmt.run(status, endDate, id)

    console.log(`Executed query rent edit with value: UPDATE BookRent SET status = ${status}, endDate = ${endDate} WHERE id = ${id}`)
    console.log(res)

    if (res.changes === 0) throw "No se pudo editar el registro"

    const data = getRentID(id)

    return {
      success: true,
      data
    }

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
    console.log("Error updating rent status", error)
    return {
      error
    }
  }
}

export async function removeRent(id: number) {
  try {
    if (isNaN(id) || id < 1) throw "El id no es valido"

    const db = getDB()
    const stmt = db.prepare("DELETE FROM BookRent WHERE id = ?")
    const res = stmt.run(id)

    if (res.changes === 0) throw "No se pudo eliminar el registro"

    return {
      success: true
    }
    
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

export async function getAllRents(page: number) {
  try {
    const db = getDB()

    const count = db.prepare("SELECT * FROM BookRent BR JOIN Books B ON BR.book = B.id WHERE BR.status <> 'returned'").all().length
    const allCount = count / 10

    const stmt = db.prepare("SELECT BR.*, B.title FROM BookRent BR JOIN Books B ON BR.book = B.id WHERE BR.status <> 'returned' ORDER BY BR.id DESC LIMIT 10 OFFSET ?")
    const res = stmt.all((page-1) * 10) as IBookRentWithData[]
    
    return {
      data: res,
      pagination: {
        count,
        pages: allCount,
        current: page
      }
    }
  } catch (error) {
    return {
      error
    }
  }
}