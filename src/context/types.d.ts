import { TTitleBarThemes } from "src/components/themes/titlebar/types"
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

interface IThemeContext {
  titlebar: {
    selected: TTitleBarThemes,
    select: (theme: TTitleBarThemes) => void
  }
}