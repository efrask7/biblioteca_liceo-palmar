import { Button, Label, Modal, TextInput } from "flowbite-react";
import { IModalProps } from "../../interface";
import { FormEvent, useCallback, useEffect, useState } from "react";

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

  function handleAcceptBtn() {
    setRentData(prev => ({
      ...prev,
      name: ""
    }))

    setConfirmModal(false)
  }

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
      <Modal.Header>
        Prestar libro
      </Modal.Header>

      <Modal.Body>
        {confirmMsg}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => handleAcceptBtn()}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}