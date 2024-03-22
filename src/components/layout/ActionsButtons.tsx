import { Dispatch, ReactNode, SetStateAction } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md"
import { BiRectangle } from "react-icons/bi"
import { IoMdClose } from "react-icons/io"
import { VscChromeRestore } from "react-icons/vsc"

type TAction = "minimize" | "maximize" | "close"

const btnActions: { [key in TAction]: () => void } = {
  close: () => window.windowAct.close(),
  maximize: () => window.windowAct.maximize(),
  minimize: () => window.windowAct.minimize()
}

function Btn({ children, action, func }: { children: ReactNode, action: TAction, func?: () => void}) {
  return (
    <button 
      className={
        `
          w-12 h-full flex items-center justify-center text-lg
          ${action === "close" ? "hover:bg-red-600" : "hover:bg-slate-900"}
        `
      }
      onClick={() => {
        btnActions[action]()
        func && func()
      }}
    >
      {children}
    </button>
  )
}

interface IActionsButtons {
  maximized: boolean
  setMaximized: Dispatch<SetStateAction<boolean>>
}

export default function ActionsButtons({ maximized, setMaximized }: IActionsButtons) {
  return (
    <div className="flex h-full">
      <Btn action="minimize">
        <MdOutlineHorizontalRule/>
      </Btn>

      <Btn action="maximize" func={() => setMaximized(prev => !prev)}>
        {
          maximized
            ? <VscChromeRestore/>
            : <BiRectangle/>
        }
      </Btn>

      <Btn action="close">
        <IoMdClose/>
      </Btn>
    </div>
  )
}