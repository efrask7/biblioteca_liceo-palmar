import { Link, Outlet } from "react-router-dom";
import Logo from "../components/layout/Logo";
import Title from "../components/layout/Title";
import ActionsButtons from "../components/layout/ActionsButtons";
import { useEffect, useState } from "react";
import SidebarNav from "../components/layout/SidebarNav";
import { VscGear } from "react-icons/vsc";
import { Sidebar } from "flowbite-react";
import { MdHouse } from "react-icons/md";
import ProviderLayout from "./ProviderLayout";

export default function RootLayout() {

  const [windowMaximized, setWindowMaximized] = useState(false)

  useEffect(() => {
    window.windowAct.handleChange(setWindowMaximized)

    return () => {
      window.windowAct.closeHandleChange()
    }
  }, [setWindowMaximized])

  return (
    <ProviderLayout>
      <div className="flex flex-col size-full">
        <header 
          className="bg-slate-800 min-h-10 flex justify-between items-center px-2 sticky top-0 z-[1000] w-full"
          onDoubleClick={() => window.windowAct.maximize()}
        >
          <Logo/>
          <Title/>
          <ActionsButtons maximized={windowMaximized} />
        </header>

        <main className="size-full grid grid-cols-[4rem_1fr] overflow-y-auto">
          <nav className="col-start-1 col-end-2 z-[100] fixed h-full">
            <SidebarNav/>
          </nav>

          <div className="col-start-2 col-end-3 p-2">
            <Outlet/>
          </div>
        </main>
      </div>
    </ProviderLayout>
  )
}
