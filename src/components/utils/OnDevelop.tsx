import IconWriting from "../../static/img/writing_icon.png"

export default function OnDevelop() {
  return (
    <div className="size-full flex items-center justify-center flex-col gap-2">
      <div className="size-36 p-4 rounded-full bg-slate-500">
        <img src={IconWriting} alt="icon" className="size-full"/>
      </div>
      <h1 className="text-3xl font-bold uppercase">¡Sección en desarrollo!</h1>
    </div>
  )
}
