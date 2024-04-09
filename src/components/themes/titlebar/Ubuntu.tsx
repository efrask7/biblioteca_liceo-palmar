import { ITitleBarBtnProps, ITitleBarProps } from "./types";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { VscChromeRestore } from "react-icons/vsc";
import { BiRectangle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

function Btn({ children, action, buttons }: ITitleBarBtnProps) {
  return (
    <button 
      className={
        `
          size-6 mx-1 flex items-center justify-center text-base
          ${action === "close" ? "hover:bg-red-600" : "hover:bg-slate-400"}
          ${action === "close" && "bg-red-600"}
          ${action === "close" && "rounded-full"}
        `
      }
      onClick={() => buttons[action]()}
    >
      {children}
    </button>
  )
}

export default function TitlebarUbuntu({ buttons, maximized }: ITitleBarProps) {
  return (
    <>
    <Btn action="minimize" buttons={buttons}>
      <MdOutlineHorizontalRule/>
    </Btn>

    <Btn action="maximize" buttons={buttons}>
      {
        maximized
          ? <VscChromeRestore/>
          : <BiRectangle/>
      }
    </Btn>

    <Btn action="close" buttons={buttons}>
      <IoMdClose/>
    </Btn>
    </>
  )
}