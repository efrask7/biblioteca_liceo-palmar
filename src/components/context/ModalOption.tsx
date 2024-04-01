import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { IModalProps } from "../../interface";

export interface IModalOptionsProps {
  message: string
  optionYesLabel?: string
  onAccept: () => void
}

export interface IModalOption extends IModalProps, IModalOptionsProps {}

export default function ModalOption({ open, close, message, optionYesLabel, onAccept }: IModalOption) {
  return (
    <Modal
      show={open}
      onClose={() => close()}
    >
      <Modal.Header/>

      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle
            className="mx-auto mb-4 size-14 text-gray-300"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-200">
            {
              message
            }
          </h3>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            color="failure"
            onClick={() => {
              onAccept()
              close()
            }}
          >
            {optionYesLabel || "Aceptar"}
          </Button>

          <Button
            color="gray"
            onClick={() => close()}
          >
            Cancelar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}