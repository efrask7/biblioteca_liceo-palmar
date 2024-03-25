import * as xlsx from "xlsx"
import { excelHeaders } from "./vars"
import { TExcelJson, fixExcelJson } from "./utils"
import * as fs from "fs"
import { Readable } from "stream"

xlsx.set_fs(fs)
xlsx.stream.set_readable(Readable)


export default function readExcel(path: string) {
  const workbook = xlsx.readFile(path)
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const excelJSON = xlsx.utils.sheet_to_json(worksheet, {
    header: excelHeaders,
    blankrows: false,
    defval: null,
    skipHidden: true
  }) as TExcelJson[]

  const excel = fixExcelJson(excelJSON)

  console.log(excel)
  return excel
}