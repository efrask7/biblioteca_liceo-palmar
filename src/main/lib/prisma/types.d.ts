type TBookParamDB = TBookParam | "id"

type TParams = {
  orderBy: TBookParamDB
  order: "ASC" | "DESC"
  limit: number
  offset: number
  where?: {
    attribute: TBookParamDB,
    value: string
  }  
}

interface IGetBooks {
  params: TParams
}

interface APIResponse {
  success?: boolean
  error?: any
}

interface IRentEdit {
  id: number
  status: "rented" | "returned"
}

interface IRentEditRes extends APIResponse {
  data: IBookRent
}

interface IBookEdit {
  id: number
  data: IBook
}

interface IBookEditRes extends APIResponse {
  data: IBook
}

interface IBookAddRes extends APIResponse {
  data: IBookDB
}