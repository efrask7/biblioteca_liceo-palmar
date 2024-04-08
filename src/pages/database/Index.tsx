import { Button, Tooltip } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import { HiCheckCircle, HiExclamationCircle, HiXCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";

export default function DBIndex() {

  const [status, setStatus] = useState({
    show: false,
    success: false,
    error: ""
  })

  const { modal, option } = useModal()
  const router = useNavigate()

  const [submitting, setSubmitting] = useState(false)
  
  const openExcel = useCallback(() => {
    if (submitting) return
    window.files.open()
    setSubmitting(true)
  }, [submitting])

  const onFileReturn = useCallback((result: APIResponse) => {
    console.log(result)
    if (result.error) {
      // setStatus({
      //   show: true,
      //   success: false,
      //   error: result.error
      // })
      modal.open({
        message: "No se pudo importar la base de datos",
        Icon: HiXCircle,
      })

      return
    }

    modal.open({
      message: "Se importo la base de datos",
      Icon: HiCheckCircle,
      btnOptional: {
        label: "Ver listado",
        onClick: () => router("/books/search")
      }
    })
  
    // setStatus({
    //   show: true,
    //   success: true,
    //   error: null
    // })
  }, [])

  const handleDeleteDB = useCallback((result: APIResponse) => {
    if (result.error) {
      modal.open({
        message: `No se pudo eliminar la base de datos - \n${result.error}`,
        Icon: HiXCircle
      })
      return
    }

    modal.open({
      message: "Base de datos eliminada",
      Icon: HiCheckCircle,
    })
  }, [modal])

  useEffect(() => {
    window.files.handleOpen(onFileReturn)
    window.files.handleDelete(handleDeleteDB)

    return () => {
      window.files.closeHandleOpen()
      window.files.closeHandleDelete()
    }
  }, [onFileReturn, handleDeleteDB])

  const deleteDB = useCallback(() => {
    option.open({
      message: "¿Estás seguro de que quieres eliminar la base de datos?",
      onAccept: () => window.files.delete(),
      Icon: HiExclamationCircle,
      optionYesLabel: "Eliminar"
    })
  }, [option])

  return (
    <div className="flex flex-col items-center gap-2 justify-center">
      <div>
        <h1 className="text-3xl font-bold uppercase">Gestión de base de datos</h1>
      </div>
      <div className="flex gap-2">
        <Button
          disabled={submitting}
          onClick={() => openExcel()}
        >
          Importar excel
        </Button>

        <Tooltip content="Función en desarrollo">
          <Button
            disabled
          >
            Exportar a excel
          </Button>
        </Tooltip>

        <Button
          color="failure"
          onClick={() => deleteDB()}
        >
          Eliminar base de datos
        </Button>
      </div>
      {/* <div>
        {
          status.show
          && (
            <div className="bg-slate-600 flex flex-col justify-center items-center gap-1 rounded-lg w-[26rem] h-64">
              {
                status.success
                ? 
                  <HiCheckCircle className="size-24"/>
                :
                  <HiXCircle className="size-24"/>
              }
              
              <p className="text-xl">{status.error ? "No se pudo importar" : "Base de datos importada"}</p>
              {
                status.error && <p>{status.error}</p>
              }

              {
                status.success
                &&
                <Link 
                  to="/books/search"
                  className="py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 focus:bg-emerald-800"
                >
                  Ver listado
                </Link>
              }
            </div>
          )
        }
      </div> */}
    </div>
  )
}