import { Link, Outlet } from "react-router-dom";
import Logo from "../components/layout/Logo";
import Title from "../components/layout/Title";
import ActionsButtons from "../components/layout/ActionsButtons";
import { useState } from "react";
import SidebarNav from "../components/layout/SidebarNav";
import { VscGear } from "react-icons/vsc";
import { Sidebar } from "flowbite-react";
import { MdHouse } from "react-icons/md";

export default function RootLayout() {

  const [windowMaximized, setWindowMaximized] = useState(false)

  return (
    <div className="flex flex-col size-full">
      <header 
        className="bg-slate-800 h-10 flex justify-between items-center px-2"
        onDoubleClick={() => {window.windowAct.maximize(); setWindowMaximized(prev => !prev)}}
      >
        <Logo/>
        <Title/>
        <ActionsButtons maximized={windowMaximized} setMaximized={setWindowMaximized}/>
      </header>

      <main className="size-full grid grid-cols-[4rem_1fr]">
        <nav className="col-start-1 col-end-2 z-[100]">
          <SidebarNav/>
        </nav>

        <div className="col-start-2 col-end-3 p-2">
          <Outlet/>
        </div>
      </main>
    </div>
  )
}
