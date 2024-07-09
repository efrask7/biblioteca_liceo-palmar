import { Button } from "flowbite-react";
import { IBooksResult } from "../../interface";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface IPagination {
  data: IBooksResult["pagination"]
  updatePage: Dispatch<SetStateAction<number>>
}

const inputClass = "h-[inherit] w-16 rounded-lg py-1 bg-transparent ring-1 text-center"
const btnClass = "h-[inherit] w-10 text-2xl rounded-lg flex items-center justify-center bg-azure-radiance-500 hover:bg-azure-radiance-600 focus:bg-azure-radiance-700 text-white disabled:bg-azure-radiance-300"

export default function Pagination({ data, updatePage }: IPagination) {

  const { count, pages, current } = data

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        Encontrados {count} resultados
      </div>

      <div className="flex items-center gap-2 h-[2rem] justify-center w-full">
        <button 
          className={btnClass}
          onClick={() => updatePage(prev => prev-1)}
          disabled={pages == 0 || current == 1}
        >
          <BiChevronLeft/>
        </button>

        <div className="flex gap-2">
          <input 
            type="number"
            value={current}
            onChange={(ev) => updatePage(ev.target.valueAsNumber)}
            className={inputClass}
          />
          <span>/</span>
          <input 
            type="number"
            readOnly
            value={Math.ceil(pages) < 1 ? 1 : Math.ceil(pages)}
            className={inputClass}
          />
        </div>

        <button 
          className={btnClass}
          onClick={() => updatePage(prev => prev+1)}
          disabled={(pages >= 0 && pages <= 1) || current == Math.ceil(pages)}
        >
          <BiChevronRight/>
        </button>
      </div>
    </div>
  )
}