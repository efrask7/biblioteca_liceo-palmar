import { app } from "electron";
import hide from "hidefile"
import fs from "fs/promises"

const documentsPath = app.getPath("documents")

const dbDirPath = `${documentsPath}/db_biblioteca`

async function createDBPath() {
  await fs.mkdir(dbDirPath, { recursive: true })
  hide.hideSync(dbDirPath)
}

const dbPath = `${documentsPath}/.db_biblioteca`

export { createDBPath, dbPath }