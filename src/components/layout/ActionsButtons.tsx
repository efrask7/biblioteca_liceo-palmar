import { ITitleBarThemes } from "../themes/titlebar/types";
import TitlebarWindows from "../themes/titlebar/Windows";
import TitlebarKubuntu from "../themes/titlebar/Kubuntu";
import { useTheme } from "../../context/ThemeContext";
import TitlebarUbuntu from "../themes/titlebar/Ubuntu";

export type TAction = "minimize" | "maximize" | "close"

export type btnActionsType = { [key in TAction]: () => void }

const btnActions: btnActionsType = {
  close: () => window.windowAct.close(),
  maximize: () => window.windowAct.maximize(),
  minimize: () => window.windowAct.minimize()
}

interface IActionsButtons {
  maximized: boolean
}


export default function ActionsButtons({ maximized }: IActionsButtons) {
  
  const { titlebar } = useTheme()

  const UseThemes: ITitleBarThemes = {
    Windows: <TitlebarWindows buttons={btnActions} maximized={maximized} />,
    Kubuntu: <TitlebarKubuntu buttons={btnActions} maximized={maximized}/>,
    Ubuntu: <TitlebarUbuntu buttons={btnActions} maximized={maximized}/>
  }
  
  return (
    <div className="flex h-full no-drag items-center" style={{pointerEvents:"all"}}>
      {
        UseThemes[titlebar.selected as keyof ITitleBarThemes]
      }
    </div>
  )
}