import { ReactNode } from "react";
import { btnActionsType, TAction } from "../../../components/layout/ActionsButtons";

interface ITitleBarProps {
  buttons: btnActionsType
  maximized: boolean
}

interface ITitleBarBtnProps { 
  buttons: btnActionsType, 
  children: ReactNode, 
  action: TAction
}

type TTitleBarThemes = 
  "Windows" |
  "Kubuntu"

type ITitleBarThemes = {
  [key in TTitleBarThemes]: ReactNode
}

enum ETitleBarThemes {
  Windows = "Windows",
  Kubuntu = "Kubuntu"
}

export type { ITitleBarBtnProps, ITitleBarProps, TTitleBarThemes, ITitleBarThemes }
export { ETitleBarThemes }