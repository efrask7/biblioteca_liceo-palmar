import { ITitleBarBtnProps, ITitleBarProps } from "./types";
import { BiChevronDown, BiChevronUp, BiRectangle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { GoDiamond } from "react-icons/go"

function Btn({ children, action, buttons }: ITitleBarBtnProps) {
  return (
    <button 
      className={
        `
          size-6 mx-2 rounded-full flex items-center justify-center text-base hover:text-black
          ${action === "close" ? "hover:bg-red-600" : "hover:bg-white"}
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
      {
        maximized
          ? <GoDiamond/>
          : <BiChevronUp/>
      }
    </Btn>

    <Btn action="close" buttons={buttons}>
      <IoMdClose/>
    </Btn>
    </>
  )
}