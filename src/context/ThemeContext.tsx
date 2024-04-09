import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { IThemeContext } from "./types";
import { TTitleBarThemes } from "../components/themes/titlebar/types";
import { getFromLocalStorage, setIntoLocalStorage } from "./utils/useUtils";

const ThemeContext = createContext<IThemeContext>({
  titlebar: {
    selected: "Windows",
    select: () => {}
  }
})

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw "Theme context used outside a provider"
  return context
}

function ThemeProvider({children}: PropsWithChildren) {
  
  const [themeSelected, setThemeSelected] = useState<TTitleBarThemes>("Windows")

  useEffect(() => {
    const titleBarLS = getFromLocalStorage("titlebar")

    if (titleBarLS) {
      setThemeSelected(titleBarLS as TTitleBarThemes)
    }
  }, [])

  function changeTheme(theme: TTitleBarThemes) {
    setThemeSelected(theme)
    setIntoLocalStorage("titlebar", theme)
  }

  return (
    <ThemeContext.Provider value={{
      titlebar: {
        selected: themeSelected,
        select: changeTheme
      }
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { useTheme, ThemeProvider }