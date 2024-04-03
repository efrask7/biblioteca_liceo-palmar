import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IBookByIdResult } from "../../interface"
import { MdArrowCircleLeft } from "react-icons/md"
import { Button } from "flowbite-react"
import { BiPen, BiTrash } from "react-icons/bi"
import BookPreview from "../../components/manage/BookPreview"
import RentBookModal from "./RentBookModal"
import RentTable from "../../components/manage/RentTable"

export default function BooksManageID() {

  const { id } = useParams()
  
  const [bookData, setBookData] = useState<IBookDB>({
    id: 0,
    autor: "",
    cantidad: "",
    editorial: "",
    fecha: "",
    observaciones: "",
    orden: "",
    origen: "",
    titulo: "",
    volumen: ""
  })

  const [editMode, setEditMode] = useState(false)

  const [bookRentData, setBookRentData] = useState<IBookRent[]>([])

  const [modalRent, setModalRent] = useState({
    open: false,
    bookId: 0,
    bookName: "",
  })

  function handleSetBookData(bookData: IBookByIdResult) {
    console.log(bookData)
    const { data } = bookData
    setBookData(prev => ({
      ...prev,
      ...data.book
    }))
    setBookRentData(data.rented)
    setModalRent(prev => ({
      ...prev,
      bookId: data.book.id,
      bookName: data.book.titulo
    }))
  }

  const handleEditRent = useCallback((result: IRentEditRes) => {
    if (result.error) {
      return
    }

    if (!id && editMode) return

    window.books.getById(Number(id))
  }, [editMode, id])

  const handleDeleteRent = useCallback((result: APIResponse) => {
    if (!id && editMode) return

    if (result.error) {
      return
    }

    window.books.getById(Number(id))
  }, [editMode, id])

  useEffect(() => {
    window.books.handleGetBookById(handleSetBookData)
    window.rent.handleEditRent(handleEditRent)
    window.rent.handleDeleteRent(handleDeleteRent)
    
    return () => {
      window.books.closeHandleGetBookById()
      window.rent.closeHandleEditRent()
      window.rent.closeHandleDeleteRent()
    }
  }, [handleSetBookData, handleEditRent, handleDeleteRent])

  useEffect(() => {
    if (!id && editMode) return
    window.books.getById(Number(id))
  }, [editMode, id])

  return (
    <div className="flex flex-col gap-2">
       <div className="flex items-center gap-2 justify-center">
        {
          !editMode
          &&
          (
            <>
            <Link
              className="text-lg"
              to="/books/search"
            >
              <MdArrowCircleLeft className="size-12"/>
            </Link>

            <Button
              color="success"
              onClick={() => setModalRent(prev => ({...prev, open:true}))}
            >
              Prestar libro
            </Button>

            <Button onClick={() => setEditMode(true)}>
              <BiPen/>
              Editar libro
            </Button>
            </>
          )
        }
      </div>
       
      <div>
        <BookPreview
          data={bookData}
          editMode={editMode}
          setEditMode={setEditMode}
        /> 
      </div>

      {
        bookRentData.length > 0
        && (
          <>
          <div>
            <h2 className="text-xl font-bold uppercase">Historial de préstamos</h2>
          </div>

          <div>
            <RentTable
              data={bookRentData}
            />
          </div>
          </>
        )
      }
      
      <RentBookModal
        open={modalRent.open}
        close={() => setModalRent(prev => ({...prev, open: false}))}
        bookName={modalRent.bookName}
        id={modalRent.bookId}
      />
    </div>
  )
}