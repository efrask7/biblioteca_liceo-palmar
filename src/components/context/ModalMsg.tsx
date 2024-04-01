import { Button, Modal } from "flowbite-react";
import { IModalProps } from "../../interface";
import { useCallback } from "react";

export interface IModalMsgProps {
  title: string
  message: string
  onClose?: () => void
  onCloseMsg?: string
}

export interface IModalMsg extends IModalProps, IModalMsgProps {}

export default function ModalMsg({ open, close, title, message, onClose, onCloseMsg }: IModalMsg) {

  const handleClose = useCallback(() => {
    if (onClose) onClose()
    close()
  }, [onClose, close])

  return (
    <Modal
      show={open}
      onClose={() => handleClose()}
    >
      <Modal.Header>
        {title}
      </Modal.Header>

      <Modal.Body>
        {message}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => handleClose()}>
          {
            onCloseMsg || "Aceptar"
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}