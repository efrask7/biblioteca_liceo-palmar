import logo from "../../static/img/logo.png"

export default function Logo() {
  return (
    <div className="flex items-center">
      <img src={logo} alt="logo" className="size-[2rem]" />
    </div>
  )
}