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
const btnClass = "h-[inherit] w-10 text-2xl rounded-lg flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-700"

export default function Pagination({ data, updatePage }: IPagination) {

  const { count, pages, current } = data

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        Encontrados {count} resultados
      </div>

      <div className="flex items-center gap-2 h-[2rem] justify-center w-full">
        {
          (pages > 0 && current > 1)
          && (
            <button 
              className={btnClass}
              onClick={() => updatePage(prev => prev-1)}
            >
              <BiChevronLeft/>
            </button>
          )
        }

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
            value={Math.round(pages)}
            className={inputClass}
          />
        </div>

        {
          (pages > 0 && current !== Math.round(pages))
          && (
            <button 
              className={btnClass}
              onClick={() => updatePage(prev => prev+1)}
            >
              <BiChevronRight/>
            </button>
          )
        }
      </div>
    </div>
  )
}