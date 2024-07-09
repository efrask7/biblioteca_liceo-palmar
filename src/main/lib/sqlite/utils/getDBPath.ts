import { app } from "electron";
import hide from "hidefile"
import fspro from "fs/promises"
import fs from "fs"

const documentsPath = app.getPath("documents")

const dbDirPath = `${documentsPath}/db_biblioteca`
const dbPath = `${documentsPath}/.db_biblioteca`

async function createDBPath() {
  if (fs.existsSync(dbPath)) return
  await fspro.mkdir(dbDirPath, { recursive: true })
  hide.hideSync(dbDirPath)
}


export { createDBPath, dbPath }