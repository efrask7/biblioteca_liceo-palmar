import { Button, Label, Spinner, TextInput, Textarea } from "flowbite-react";
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useModal } from "../../context/ModalContext";
import { HiCheckCircle, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface IBookPreview {
  data: IBookDB
  editMode: boolean
  setEditMode: Dispatch<SetStateAction<boolean>>
}

export default function BookPreview({ data, editMode, setEditMode }: IBookPreview) {

  const router = useNavigate()
  const { modal, option } = useModal()

  const [submitting, setSubmitting] = useState(false)

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

  useEffect(() => {
    setBookData(prev => {

      if (data.id === 0) return prev

      const newData: {[x:string]: any} = {}

      for (let i in data) {
        data[i as keyof IBookDB]
          ? newData[i] = data[i as keyof IBookDB]
          : newData[i] = ""
      }

      return newData as IBookDB
    })
  }, [data])

  function updateBookData(attr: keyof IBookDB, value: string) {
    setBookData(prev => ({
      ...prev,
      [attr]: value
    }))
  }

  const useLabelColor = useCallback(() => {
    return editMode ? "text-emerald-400 dark:text-emerald-400" : "text-gray-200 dark:text-gray-200"
  }, [editMode])

  const handleSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault()

    if (submitting) return

    setSubmitting(true)

    const data: {[x: string]: any} = {}

    Object.keys(bookData).forEach((key, i, arr) => {
      if (key === "id") return
      data[key] = bookData[key as keyof typeof bookData]
    })

    window.books.updateBook({
      id: bookData.id,
      data
    })
  }, [bookData, submitting])

  const handleOnSubmitFinish = useCallback((result: IBookEditRes) => {
    setSubmitting(false)
    if (result.error) return

    setEditMode(false)

    modal.open({
      message: "Se actualizo el libro",
      Icon: HiCheckCircle
    })

    if (bookData.id === 0) return
    window.books.getById(bookData.id)
  }, [modal, bookData])

  const handleDeleteBook = useCallback((result: APIResponse) => {
    if (result.error) return
    
    modal.open({
      message: "Se borro el libro",
      Icon: HiCheckCircle,
      onClose: () => router("/books/search")
    })
  }, [])

  useEffect(() => {
    window.books.handleUpdateBook(handleOnSubmitFinish)
    window.books.handleDeleteBook(handleDeleteBook)

    return () => {
      window.books.closeHandleUpdateBook()
      window.books.closeHandleDeleteBook()
    }
  }, [handleOnSubmitFinish, handleDeleteBook])

  const handleOptionDeleteBook = useCallback(() => {
    option.open({
      message: `¿Esta seguro de borrar el libro ${bookData.titulo}?`,
      onAccept: () => window.books.deleteBook(bookData.id),
      Icon: HiTrash,
      optionYesLabel: "Borrar"
    })    
  }, [bookData])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      {
        editMode && (

          <div className="flex items-center justify-center gap-2">
            <Button
              type="submit"
              color="success"
              disabled={submitting}
            >
              {
                submitting
                ? <Spinner/>
                : "Guardar cambios"
              }
            </Button>

            <Button
              type="button"
              color="failure"
              onClick={() => handleOptionDeleteBook()}
            >
              <BiTrash/>
              Borrar libro
            </Button>

            <Button
              type="button"
              onClick={() => setEditMode(false)}
            >
              Cancelar
            </Button>
          </div>
        )
      }

      <div className="p-2 rounded-lg border w-3/4">
        <div>
          <div><Label value="ID" htmlFor="bp_id"/></div>
          <TextInput value={bookData.id} readOnly/>
        </div>

        <div>
          <div>
            <Label value="Titulo" htmlFor="bp_titulo" className={useLabelColor()}/>
          </div>
          <TextInput
            value={bookData.titulo}
            onChange={(ev) => updateBookData("titulo", ev.target.value)}
            readOnly={!editMode}
            id="bp_titulo"
          />
        </div>

        <div>
          <div>
            <Label value="Autor" htmlFor="bp_autor" className={useLabelColor()}/>
          </div>
          <TextInput
            value={bookData.autor}
            onChange={(ev) => updateBookData("autor", ev.target.value)}
            readOnly={!editMode}
            id="bp_autor"
          />
        </div>

        <div>
          <div>
            <Label value="Editorial" htmlFor="bp_editorial" className={useLabelColor()}/>
          </div>
          <TextInput
            value={bookData.editorial}
            onChange={(ev) => updateBookData("editorial", ev.target.value)}
            readOnly={!editMode}
            id="bp_editorial"
          />
        </div>

        <div>
          <div>
            <Label value="Volumen" htmlFor="bp_volumen" className={useLabelColor()}/>
          </div>

          <TextInput
            value={bookData.volumen}
            onChange={(ev) => updateBookData("volumen", ev.target.value)}
            readOnly={!editMode}
            id="bp_volumen"
          />
        </div>

        <div>
          <div>
            <Label value="Fecha" htmlFor="bp_fecha" className={useLabelColor()}/>
          </div>
          
          <TextInput
            value={bookData.fecha}
            onChange={(ev) => updateBookData("fecha", ev.target.value)}
            readOnly={!editMode}
            id="bp_fecha"
          />
        </div>

        <div>
          <div>
            <Label value="Origen" htmlFor="bp_origen" className={useLabelColor()}/>
          </div>

          <TextInput
            value={bookData.origen}
            onChange={(ev) => updateBookData("origen", ev.target.value)}
            readOnly={!editMode}
            id="bp_origen"
          />
        </div>

        <div>
          <div>
            <Label value="Orden" htmlFor="bp_orden" className={useLabelColor()}/>
          </div>

          <TextInput
            value={bookData.orden}
            onChange={(ev) => updateBookData("orden", ev.target.value)}
            readOnly={!editMode}
            id="bp_orden"
          />
        </div>

        <div>
          <div>
            <Label value="Cantidad" htmlFor="bp_cantidad" className={useLabelColor()}/>
          </div>

          <TextInput
            value={bookData.cantidad}
            onChange={(ev) => updateBookData("cantidad", ev.target.value)}
            readOnly={!editMode}
            id="bp_cantidad"
          />
        </div>

        <div>
          <div>
            <Label value="Observaciones" htmlFor="bp_observaciones" className={useLabelColor()}/>
          </div>

          <Textarea
            value={bookData.observaciones}
            onChange={(ev) => updateBookData("observaciones", ev.target.value)}
            readOnly={!editMode}
            id="bp_observaciones"
            className="min-h-[10rem]"
          />
        </div>
      </div>
    </form>
  )
}