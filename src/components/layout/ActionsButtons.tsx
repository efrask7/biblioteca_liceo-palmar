import { ReactNode } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md"
import { BiRectangle } from "react-icons/bi"
import { IoMdClose } from "react-icons/io"

type TAction = "minimize" | "maximize" | "close"

function Btn({ children, action }: { children: ReactNode, action: TAction}) {
  return (
    <button 
      className={
        `
          w-12 h-full flex items-center justify-center text-lg
          ${action === "close" ? "hover:bg-red-600" : "hover:bg-slate-900"}
        `
      }
    >
      {children}
    </button>
  )
}

export default function ActionsButtons() {
  return (
    <div className="flex h-full">
      <Btn action="minimize">
        <MdOutlineHorizontalRule/>
      </Btn>

      <Btn action="maximize">
        <BiRectangle/>
      </Btn>

      <Btn action="close">
        <IoMdClose/>
      </Btn>
    </div>
  )
}