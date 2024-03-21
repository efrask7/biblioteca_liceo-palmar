import { Route, Routes, createMemoryRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Index from "../pages/Index";

const routesElements = createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<Index/>}/>
  </Route>
)

const appRoutes = createMemoryRouter(routesElements)

export default appRoutes
