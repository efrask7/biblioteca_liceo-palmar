import { Outlet } from "react-router-dom";
import Logo from "../components/layout/Logo";
import Title from "../components/layout/Title";
import ActionsButtons from "../components/layout/ActionsButtons";

export default function RootLayout() {
  return (
    <div className="flex flex-col">
      <header className="bg-slate-800 h-10 flex justify-between items-center px-2">
        <Logo/>
        <Title/>
        <ActionsButtons/>
      </header>

      <main>
        <Outlet/>
      </main>
    </div>
  )
}
