import { BiSearch } from "react-icons/bi";
import SearchDropdown from "./SearchDropdownRender";
import { FormEvent, useCallback, useState } from "react";

export type TSearch = {
  attribute: string
  value: string
}

interface ISearchBar {
  updateSearch: (params: TSearch) => void
}


export default function SearchBar({ updateSearch }: ISearchBar) {

  const [inputFocus, setInputFocus] = useState(false)

  const [searchParams, setSearchParams] = useState({
    attribute: "ID",
    value: ""
  })

  function updateAttribute(attribute: string) {
    setSearchParams(prev => ({
      ...prev,
      attribute
    }))
  }

  const handleSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault()

    updateSearch(searchParams)
  }, [searchParams])

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSubmit}
        className={`
          w-full flex overflow-hidden bg-slate-800 rounded-xl
          ${inputFocus && "ring ring-offset-1 ring-cyan-500"}
        `}
      >
        <div className="w-[10rem] h-[inherit] flex items-center justify-center border-r">
          <SearchDropdown
            active={searchParams.attribute}
            updateActive={updateAttribute}
          />
        </div>
        
        <input 
          type={searchParams.attribute.toLowerCase() === "id" ? "number" : "text"} 
          value={searchParams.value}
          onChange={(ev) => setSearchParams(prev => ({...prev, value: ev.target.value}))}
          className="flex-1 appeareance-none bg-transparent focus:ring-0 input-noborders"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />

        <button 
          type="submit" 
          className="w-[5rem] h-[inherit] flex items-center justify-center border-l"
        >
          <BiSearch/>
        </button>
      </form>
    </div>
  )
}