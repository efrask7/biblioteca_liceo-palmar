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
  const router = useNavigate()

  const toUrl = useCallback((url: string) => {
    router(url)
  }, [router])

  return (
    <Sidebar 
      collapsed={!open}
      className="select-none"
      theme={{
        root: {
          base: 'h-full',
          collapsed: {
              on: 'w-16',
              off: 'w-64',
          },
          inner: 'h-full overflow-y-auto overflow-x-hidden rounded-none bg-gray-50 py-4 px-3 dark:bg-gray-800',
        }
      }}
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