import { useCallback, useEffect, useState } from "react";
import { IBooksRentedResult, IBooksResult } from "../../interface";
import TableBooksRented from "../../components/rented/TableBooksRented";
import Pagination from "../../components/search/Pagination";

export default function BooksSearchRented() {

  const [currentPage, setCurrentPage] = useState(1)
  const [rentedData, setRentedData] = useState<IBookRentWithData[]>([])
  const [rentedPagination, setRentedPagination] = useState<IBooksRentedResult['pagination']>({
    count: 0,
    current: 0,
    pages: 0
  })

  const handleGetAllRentedData = useCallback((data: IBooksRentedResult) => {
    console.log("HOLA PABLO", data)
    setRentedPagination(data.pagination)
    setRentedData(data.data)
  }, [])

  useEffect(() => {
    window.rent.getAll(currentPage)
  }, [currentPage])

  useEffect(() => {
    window.rent.handleGetAll(handleGetAllRentedData)
    return () => window.rent.closeHandleGetAll()
  }, [handleGetAllRentedData])
  
  return (
    <div className="flex flex-col gap-2 mt-2">
      <h1 className="text-2xl font-bold">Libros prestados</h1>

      <TableBooksRented
        data={rentedData}      
      />

      <Pagination
        data={rentedPagination}
        updatePage={setCurrentPage}
      />
    </div>
  )
}