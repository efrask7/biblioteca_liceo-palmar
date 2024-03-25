import { Button, TextInput } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { IBooksResult } from "../../interface";
import TableBooks from "../../components/search/TableBooks";

export default function BooksSearch() {

  const [searchParams, setSearchParams] = useState<IGetBooks["params"]>({
    limit: 10,
    offset: 1,
    order: "ASC",
    orderBy: "id"
  }) 

  const [booksData, setBooksData] = useState<IBookDB[]>([])

  useEffect(() => {
    window.books.getBooks({params:searchParams})
  }, [searchParams])

  useEffect(() => {
    console.log("SP", searchParams)
  }, [searchParams])

  const handleGetBooks = useCallback((booksResult: IBooksResult) => {
    console.log(booksResult)

    if (booksResult.data.length > 0) {
      setBooksData(booksResult.data)
    }
  }, [])
  
  useEffect(() => {
    window.books.handleGetBooks(handleGetBooks)

    return () => window.books.closeHandleGetBooks()
  }, [handleGetBooks])

  const setOrderBy = useCallback((attribute: TBookParamDB) => {
    console.log("Called orderby", attribute)
    setSearchParams(prev => ({
      ...prev,
      orderBy: attribute,
      order: attribute === prev.orderBy ? (prev.order === "ASC" ? "DESC" : "ASC") : "ASC" 
    }))
  }, [setSearchParams])

  
  return (
    <div>
      <TableBooks
        data={booksData}
        setOrderBy={setOrderBy}
        params={searchParams}
      />      
    </div>
  )
}