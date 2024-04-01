import { IModalMsgProps } from "src/components/context/ModalMsg"

interface IModalContext {
  modal: {
    open: (props: IModalMsgProps) => void
  }
}