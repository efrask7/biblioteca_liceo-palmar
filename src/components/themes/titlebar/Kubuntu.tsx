import { ITitleBarBtnProps, ITitleBarProps } from "./types";
import { BiChevronDown, BiChevronUp, BiRectangle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

function Btn({ children, action, buttons }: ITitleBarBtnProps) {
  return (
    <button 
      className={
        `
          p-1 rounded-full flex items-center justify-center text-2xl
          ${action === "close" ? "hover:bg-red-600" : "hover:bg-slate-400"}
        `
      }
      onClick={() => buttons[action]()}
    >
      {children}
    </button>
  )
}

export default function TitlebarKubuntu({ buttons, maximized }: ITitleBarProps) {
  return (
    <>
    <Btn action="minimize" buttons={buttons}>
      <BiChevronDown/>
    </Btn>

    <Btn action="maximize" buttons={buttons}>
      <BiChevronUp/>
    </Btn>

    <Btn action="close" buttons={buttons}>
      <IoMdClose/>
    </Btn>
    </>
  )
}