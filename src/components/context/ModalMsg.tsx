import { Button, Modal } from "flowbite-react";
import { IModalProps } from "../../interface";
import { useCallback } from "react";
import { IconType } from "react-icons";

export interface IModalMsgProps {
  title?: string
  message: string
  Icon?: IconType
  onClose?: () => void
  onCloseMsg?: string
  btnOptional?: {
    label: string
    onClick: () => void
  }
}

export interface IModalMsg extends IModalProps, IModalMsgProps {}

export default function ModalMsg({ open, close, title, message, onClose, onCloseMsg, Icon, btnOptional }: IModalMsg) {

  const handleClose = useCallback(() => {
    if (onClose) onClose()
    close()
  }, [onClose, close])

  const handleOnClickOptional = useCallback(() => {
    if (btnOptional) {
      btnOptional.onClick()
      close()
    }
  }, [close, btnOptional])

  return (
    <Modal
      show={open}
      onClose={() => handleClose()}
    >
      {
        title
        &&
        (
          <Modal.Header>
            {title}
          </Modal.Header>
        )
      }

      <Modal.Body>
        <div className="text-center">
          {
            Icon
            && 
            <Icon className="mx-auto mb-4 size-14 text-slate-700" />
          }
          <h3 className="mb-5 text-lg font-normal text-black">
            {
              message
            }
          </h3>
        </div>

        {
          Icon
          &&
          (
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleClose()}
                color="success"
              >
                Aceptar
              </Button>

              {
                btnOptional
                &&
                <Button
                  onClick={() => handleOnClickOptional()}
                >
                  {btnOptional.label}
                </Button>
              }
            </div>
          )
        }

      </Modal.Body>

      {
        !Icon
        && (
          <Modal.Footer>
            <Button 
              onClick={() => handleClose()}
              color="success"
            >
              {
                onCloseMsg || "Aceptar"
              }
            </Button>

            {
                btnOptional
                &&
                <Button
                  onClick={() => handleOnClickOptional()}
                >
                  {btnOptional.label}
                </Button>
              }
          </Modal.Footer>
        )
      }

    </Modal>
  )
}