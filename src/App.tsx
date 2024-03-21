import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import appRoutes from "./router/Routes"

const root = createRoot(document.getElementById("root"))
root.render(
  <RouterProvider router={appRoutes}/>
)