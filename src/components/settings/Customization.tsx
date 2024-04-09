import { Label, Select } from "flowbite-react";
import { ETitleBarThemes, TTitleBarThemes } from "../themes/titlebar/types";
import { useTheme } from "../../context/ThemeContext";

export default function SettingsCustomization() {

  const { titlebar } = useTheme()

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Personalización:</h2>

      <div>
        <h3>Botones en barra de titulo</h3>
        <div>
          <div><Label value="Seleccionar tema" htmlFor="titlebar_theme"/></div>
        </div>
        <Select 
          id="titlebar_theme"
          onChange={(ev) => titlebar.select(ev.target.value as TTitleBarThemes)}  
          value={titlebar.selected}
        >
          {
            Object.keys(ETitleBarThemes).map((theme, i) => (
              <option 
                value={theme} 
                key={i}
              >
                {theme}
              </option>
            ))
          }
        </Select>
      </div>
    </div>
  )
}