import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { HiCheck, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const bookDefault: Omit<IBookDB, "id"> = {
  titulo: "",
  autor: "",
  cantidad: "",
  editorial: "",
  fecha: "",
  observaciones: "",
  orden: "",
  origen: "",
  volumen: ""
}

export default function BooksManage() {

  const { modal } = useModal()
  const [bookData, setBookData] = useState<IBook>(bookDefault)
  const [submitting, setSubmitting] = useState(false)

  const router = useNavigate()

  function updateBookData(attr: keyof IBookDB, value: string) {
    setBookData(prev => ({
      ...prev,
      [attr]: value
    }))
  }

  const handleSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault()

    if (submitting) return

    setSubmitting(true)

    let nullValues = 0

    const bookKeys = Object.keys(bookData)

    bookKeys.forEach((key: keyof typeof bookData) => {
      if (!bookData[key]) nullValues++
    })

    if (nullValues === bookKeys.length) {
      setSubmitting(false)
      modal.open({
        message: "Debes llenar al menos el titulo",
        Icon: HiExclamationCircle,
      })
      return
    }

    window.books.addBook(bookData)
  }, [bookData, submitting])

  const handleAddBookRes = useCallback((result: IBookAddRes) => {
    if (result.error) {
      return
    }

    modal.open({
      message: `Se añadio el libro "${result.data.titulo}" con el ID: ${result.data.id}`,
      Icon: HiCheckCircle,
      btnOptional: {
        label: "Ver libro",
        onClick: () => router(`/books/manage/${result.data.id}`)
      }
    })

    setBookData(bookDefault)
    setSubmitting(false)
  }, [modal])

  useEffect(() => {
    window.books.handleAddBook(handleAddBookRes)

    return () => window.books.closeHandleAddBook()
  }, [])

  const LABEL_CLASS = "text-slate-800 italic font-bold text-base"

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div>
        <h1 className="text-2xl font-bold uppercase">Añadir libro</h1>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="w-3/4 border rounded-lg p-2 flex flex-col gap-2 border-azure-radiance-500 bg-azure-radiance-400 text-black"  
      >
        <div>
          <div>
            <Label value="Titulo" htmlFor="bp_titulo" className={LABEL_CLASS}/>
          </div>
          <TextInput
            value={bookData.titulo}
            onChange={(ev) => updateBookData("titulo", ev.target.value)}
            id="bp_titulo"
            required
          />
        </div>

        <div>
          <div>
            <Label value="Autor" htmlFor="bp_autor" className={LABEL_CLASS}/>
          </div>
          <TextInput
            value={bookData.autor}
            onChange={(ev) => updateBookData("autor", ev.target.value)}
            id="bp_autor"
          />
        </div>

        <div>
          <div>
            <Label value="Editorial" htmlFor="bp_editorial" className={LABEL_CLASS}/>
          </div>
          <TextInput
            value={bookData.editorial}
            onChange={(ev) => updateBookData("editorial", ev.target.value)}
            id="bp_editorial"
          />
        </div>

        <div>
          <div>
            <Label value="Volumen" htmlFor="bp_volumen" className={LABEL_CLASS}/>
          </div>

          <TextInput
            value={bookData.volumen}
            onChange={(ev) => updateBookData("volumen", ev.target.value)}
            id="bp_volumen"
          />
        </div>

        <div>
          <div>
            <Label value="Fecha" htmlFor="bp_fecha" className={LABEL_CLASS}/>
          </div>
          
          <TextInput
            value={bookData.fecha}
            onChange={(ev) => updateBookData("fecha", ev.target.value)}
            id="bp_fecha"
          />
        </div>

        <div>
          <div>
            <Label value="Origen" htmlFor="bp_origen" className={LABEL_CLASS}/>
          </div>

          <TextInput
            value={bookData.origen}
            onChange={(ev) => updateBookData("origen", ev.target.value)}
            id="bp_origen"
          />
        </div>

        <div>
          <div>
            <Label value="Orden" htmlFor="bp_orden" className={LABEL_CLASS}/>
          </div>

          <TextInput
            value={bookData.orden}
            onChange={(ev) => updateBookData("orden", ev.target.value)}
            id="bp_orden"
          />
        </div>

        <div>
          <div>
            <Label value="Cantidad" htmlFor="bp_cantidad" className={LABEL_CLASS}/>
          </div>

          <TextInput
            value={bookData.cantidad}
            onChange={(ev) => updateBookData("cantidad", ev.target.value)}
            id="bp_cantidad"
          />
        </div>

        <div>
          <div>
            <Label value="Observaciones" htmlFor="bp_observaciones" className={LABEL_CLASS}/>
          </div>

          <Textarea
            value={bookData.observaciones}
            onChange={(ev) => updateBookData("observaciones", ev.target.value)}
            id="bp_observaciones"
            className="min-h-[10rem]"
          />
        </div>

        <div>
          <Button
            type="submit"
            color="success"
            className="w-full"
          >
            Añadir
          </Button>
        </div>

      </form>
    </div>
  )
}