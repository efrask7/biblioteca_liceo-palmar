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