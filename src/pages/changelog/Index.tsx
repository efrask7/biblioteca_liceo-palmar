import Markdown from "react-markdown"
import { useUpdate } from "../../context/UpdateContext"
import { APP_VERSION } from "../../utils/info"
import { Button } from "flowbite-react"
import remarkGfm from "remark-gfm"
import remarkGithub from "remark-github"
import { BiCheck } from "react-icons/bi"

export default function ChangelogIndex() {
  
  const { updateData } = useUpdate()
  
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Ultima versión</h1>
      <div>
        <p>Versión actual: {APP_VERSION}</p>
        <p>Ultima: ({updateData.latest.version})</p>
        {
          updateData.latest.version === updateData.version.labelLocal
          ? <p className="text-emerald-400 font-bold flex items-center gap-2 px-4 py-2 rounded-lg bg-head w-fit"><BiCheck/> Ya estas al dia</p>
          : (
            <>
                <p>Nueva version disponible</p>
                <Button>
                  Actualizar
                </Button>
            </>
          )
        }
      </div>

      <div>
        <h2 className="text-xl font-bold">Cambios:</h2>

        <div className="p-2 border rounded-lg border-slate-800">
          <Markdown remarkPlugins={[remarkGfm]}>
            {updateData.latest.changelog}
          </Markdown>
        </div>
      </div>
    </div>
  )
}