import { IModalMsgProps } from "../components/context/ModalMsg"
import { IModalOptionsProps } from "../components/context/ModalOption"

interface IModalContext {
  modal: {
    open: (props: IModalMsgProps) => void
  }
  option: {
    open: (props: IModalOptionsProps) => void
  }
}