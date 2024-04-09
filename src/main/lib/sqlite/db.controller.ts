import Database, { Database as DBType } from "better-sqlite3"
import { createDBPath, dbPath } from "./utils/getDBPath"

const QUERY_TABLE_BOOKS = `
  CREATE TABLE IF NOT EXISTS Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    author VARCHAR(255),
    orderBk VARCHAR(255),
    volume VARCHAR(20),
    publisher VARCHAR(255),
    book_date VARCHAR(20),
    origin VARCHAR(255),
    observations TEXT,
    quantity VARCHAR(30)
  )
`

const QUERY_TABLE_BOOK_RENT = `
  CREATE TABLE IF NOT EXISTS BookRent (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(40) NOT NULL,
    startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    endDate DATETIME,
    CONSTRAINT fk_book FOREIGN KEY (book) REFERENCES Books(id)
  )
`

export async function createDatabase() {
  try {
    console.log("Creating database if not exists")

    await createDBPath()

    const db = new Database(`${dbPath}/bib.db`, {
      fileMustExist: false
    })

    db.pragma("journal_mode = WAL")

    console.log("DB Created", db)

    const booksTable = db.prepare(QUERY_TABLE_BOOKS).run()

    console.log(booksTable.changes ? "Created books table" : "Books table already exists")

    const rentTable = db.prepare(QUERY_TABLE_BOOK_RENT).run()

    console.log(rentTable.changes ? "Created rent table" : "Rent table already exists")
  } catch (error) {
    console.log("Error creating database", error)
    return {
      error
    }
  }
}

export function getDB(): DBType {
  try {
    const db = new Database(`${dbPath}/bib.db`, {
      fileMustExist: true
    })

    return db
  } catch (error) {
    return error
  }
}

export async function beginTransactionDB(query: string, data: any[]): Promise<{success?:boolean,error?:any}> {
  return new Promise((resolve, reject) => {
    try {

      const db = getDB()

      const insert = db.prepare(query)

      db.transaction(() => {
        for (const item of data) {
          insert.run(item)
        }
      })

      resolve({success: true})
    } catch (error) {
      reject({error})
    }
  })
}

export function getTableCount(table: "Books" | "BookRent") {
  const db = getDB()

  const stmt = db.prepare(`SELECT count(id) FROM ${table}`)

  const res = stmt.get() as { 'count(id)': number }

  return res['count(id)']
}