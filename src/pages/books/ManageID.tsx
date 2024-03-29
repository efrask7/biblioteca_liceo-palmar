import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IBookByIdResult } from "../../interface"
import { MdArrowCircleLeft } from "react-icons/md"
import { Button } from "flowbite-react"
import { BiPen, BiTrash } from "react-icons/bi"
import BookPreview from "../../components/manage/BookPreview"

export default function BooksManageID() {

  const { id } = useParams()
  
  const [bookData, setBookData] = useState<IBookDB>({
    id: 0,
  })

  const [editMode, setEditMode] = useState(false)

  const [bookRentData, setBookRentData] = useState<IBookRent[]>([])

  function handleSetBookData(bookData: IBookByIdResult) {
    const { data } = bookData
    setBookData(data.book)
    setBookRentData(data.rented)
  }

  useEffect(() => {
    if (!id) return
    window.books.handleGetBookById(handleSetBookData)
    // window.books.getById(Number(id))
    
    return () => window.books.closeHandleGetBookById()
  }, [id])

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
            <button
              className="text-lg"
            >
              <MdArrowCircleLeft className="size-12"/>
            </button>

            <Button
              color="success"
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
    </div>
  )
}