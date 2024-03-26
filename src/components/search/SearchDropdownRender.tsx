import { Dropdown } from "flowbite-react";
import { TSearch } from "./SearchBar";

interface ISearchDropdown {
  active: string
  updateActive: (attribute: string) => void
}

const list = ["ID", "Titulo", "Autor", "Editorial", "Fecha", "Cantidad"]

export default function SearchDropdown({ active, updateActive }: ISearchDropdown) {
  return (
    <Dropdown 
      label="" 
      renderTrigger={() => <div className="w-full text-center cursor-pointer">{active}</div>} 
      className="h-fit"
    >
      {
        list.filter(search => search !== active).map((search, i) => (
          <Dropdown.Item key={i} onClick={() => updateActive(search)}>{search}</Dropdown.Item>
        ))
      }
    </Dropdown>
  )
}