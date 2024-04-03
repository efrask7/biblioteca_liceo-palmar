import { Button, Label, Modal, TextInput } from "flowbite-react";
import { IModalProps } from "../../interface";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";

interface IRentBookModal extends IModalProps {
  id: number
  bookName: string
}

export interface IRentData {
  id: number
  name: string
  bookName: string
}

export default function RentBookModal({ open, close, id, bookName }: IRentBookModal) {
  
  const [confirmModal, setConfirmModal] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState("")

  const [rentData, setRentData] = useState<IRentData>({
    id: 0,
    bookName: "",
    name: ""
  })

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setRentData({id, bookName, name: ""})
  }, [id, bookName])

  
  const handleSubmit = useCallback(async (ev: FormEvent) => {
    ev.preventDefault()
    
    if (!rentData.name || !rentData.id) return
    setSubmitting(true)
    
    window.rent.addRent(rentData)
  }, [rentData])
  
  const handleAddRent = useCallback((res: APIResponse) => {
    console.log(res)
    setSubmitting(false)
    if (!res.success) {
      setConfirmMsg("Ocurrio un error al prestar el libro")
    } else {
      setConfirmMsg(`Se presto el libro (${rentData.id}) a ${rentData.name}`)
    }

    close()

    setConfirmModal(true)
  }, [rentData, close])

  useEffect(() => {
    window.rent.handleAddRent(handleAddRent)

    return () => window.rent.closeHandleAddRent()
  }, [handleAddRent])

  const handleAcceptBtn = useCallback(() => {
    setRentData(prev => ({
      ...prev,
      name: ""
    }))

    setConfirmModal(false)
    window.books.getById(id)
  }, [id])

  return (
    <>
    <Modal show={open} onClose={() => close()}>
      <Modal.Header>
        Prestar libro
      </Modal.Header>

      <Modal.Body>
        <form 
          className="flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div>
            <div><Label value="Libro" htmlFor="rent_book"/></div>
            <TextInput
              value={`${bookName} (${id})`}
              readOnly
              id="rent_book"
            />
          </div>

          <div>
            <div><Label value="Nombre de la persona" htmlFor="rent_name"/></div>
            <TextInput
              value={rentData.name}
              onChange={(ev) => setRentData(prev => ({...prev, name: ev.target.value}))}
              id="rent_name"
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
          >
            Prestar
          </Button>
        </form>
      </Modal.Body>
    </Modal>

    <Modal show={confirmModal} onClose={() => handleAcceptBtn()}>
      <Modal.Body>
        <div className="text-center">
          <HiCheckCircle
            className="mx-auto mb-4 size-14 text-gray-300"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-200">
            {
              confirmMsg
            }
          </h3>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            color="failure"
            onClick={() => handleAcceptBtn()}
            size="lg"
          >
            Aceptar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  )
}