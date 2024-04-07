import { Sidebar } from "flowbite-react";
import { useCallback, useState } from "react";
import { IconType } from "react-icons";
import { BiEdit, BiInfoCircle, BiPlus, BiSearch } from "react-icons/bi";
import { MdHouse, MdLibraryBooks, MdMenu } from "react-icons/md";
import { VscDatabase, VscGear } from "react-icons/vsc";
import { useNavigate, useNavigation } from "react-router-dom";

function RenderLink({ to, icon, label }: { to: string, icon?: IconType, label: string }) {

  const router = useNavigate()

  return (
    <Sidebar.Item 
      onClick={() => router(to)} 
      icon={icon ? icon : null}
      className="cursor-pointer"
    >
      {label}
    </Sidebar.Item>
  )
}

export default function SidebarNav() {

  const [open, setOpen] = useState(false)

  return (
    <Sidebar 
      collapsed={!open}
      className="select-none transition-all"
      theme={{
        root: {
          base: 'h-full',
          collapsed: {
              on: 'w-16',
              off: 'w-64',
          },
          inner: 'h-full overflow-y-auto overflow-x-hidden rounded-none bg-head py-4 px-3',
        },
        item: {
          base: 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-white hover:text-black hover:bg-headgreen',
          icon: {
            base: 'h-6 w-6 flex-shrink-0 transition duration-75',
          },
        },
        collapse: {
          button: 'group flex w-full items-center rounded-lg p-2 text-base font-normal text-white transition duration-75 hover:bg-headgreen hover:text-black',
          icon: {
            base: 'h-6 w-6 flex-shrink-0 transition duration-75',
            open: {
              on: 'text-slate-300'
            }
          },
        }
      }}
      onPointerLeave={() => setOpen(false)}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={MdMenu} onClick={() => setOpen(prev => !prev)} className="cursor-pointer">
            {open ? "Cerrar" : "Abrir"}
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <RenderLink label="Inicio" to="/" icon={MdHouse}/>

          <Sidebar.Collapse icon={MdLibraryBooks} label="Libros">
            <RenderLink label="Buscar" to="/books/search" icon={BiSearch}/>
            <RenderLink label="Agregar" to="/books/manage" icon={BiPlus}/>
          </Sidebar.Collapse>

          <RenderLink label="Base de datos" to="/database" icon={VscDatabase}/>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <RenderLink label="Acerca" to="/about" icon={BiInfoCircle}/>
          {/* <RenderLink label="Ajustes" to="/settings" icon={VscGear}/> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}