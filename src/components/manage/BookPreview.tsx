import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

interface IBookPreview {
  data: IBookDB
  editMode: boolean
  setEditMode: Dispatch<SetStateAction<boolean>>
}

export default function BookPreview({ data, editMode, setEditMode }: IBookPreview) {

  const [bookData, setBookData] = useState<IBookDB>({
    ...data
  })

  useEffect(() => {
    setBookData(data)
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

  return (
    <form action="" className="flex flex-col gap-2 items-center">
      {
        editMode && (

          <div className="flex items-center justify-center gap-2">
            <Button
              type="submit"
              color="success"
            >
              Guardar cambios
            </Button>

            <Button
              type="button"
              color="failure"
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