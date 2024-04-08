import { Button, TextInput } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { IBooksResult } from "../../interface";
import TableBooks from "../../components/search/TableBooks";
import SearchBar, { TSearch } from "../../components/search/SearchBar";
import Pagination from "../../components/search/Pagination";

export default function BooksSearch() {
  
  const [currentPage, setCurrentPage] = useState(1)

  const [searchParams, setSearchParams] = useState<IGetBooks["params"]>({
    limit: 10,
    offset: 1,
    order: "ASC",
    orderBy: "id"
  }) 

  useEffect(() => {
    setSearchParams(prev => ({
      ...prev,
      offset: currentPage
    }))
  }, [currentPage])

  const [booksData, setBooksData] = useState<IBookDB[]>([])
  const [booksPagination, setBooksPagination] = useState<IBooksResult["pagination"]>({
    count: 0,
    current: 0,
    pages: 0
  })

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
      setBooksPagination(booksResult.pagination)
    } else {
      setBooksData([])
      setBooksPagination({
        count: 0,
        current: 1,
        pages: 0
      })
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

  function updateSearch(params: TSearch) {
    setSearchParams(prev => ({
      ...prev,
      where: {
        attribute: params.attribute.toLowerCase() as TBookParamDB,
        value: params.value
      }
    }))
  }

  function updatePage(page: number) {
    setSearchParams(prev => ({
      ...prev,
      offset: page
    }))
  }
  
  return (
    <div className="flex flex-col gap-2 mt-2">
      <h1 className="text-2xl font-bold">Buscador de libros</h1>

      <SearchBar
        updateSearch={updateSearch}
      />

      <TableBooks
        data={booksData}
        setOrderBy={setOrderBy}
        params={searchParams}
      />
      
      <Pagination
        data={{
          ...booksPagination,
          current: currentPage
        }}
        updatePage={setCurrentPage}
      />
    </div>
  )
}