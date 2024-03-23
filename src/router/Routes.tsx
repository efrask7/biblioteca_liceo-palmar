import { Route, Routes, createMemoryRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Index from "../pages/Index";
import BooksSearch from "../pages/books/Search";
import BooksManage from "../pages/books/Manage";
import DBIndex from "../pages/database/Index";
import AboutIndex from "../pages/about/Index";
import SettingsIndex from "../pages/settings/Index";

const routesElements = createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<Index/>}/>

    <Route path="books">
      <Route path="search" element={<BooksSearch/>}/>
      <Route path="manage" element={<BooksManage/>}/>
    </Route>

    <Route path="database">
      <Route index element={<DBIndex/>}/>
    </Route>

    <Route path="about">
      <Route index element={<AboutIndex/>}/>
    </Route>

    <Route path="settings">
      <Route index element={<SettingsIndex/>}/>
    </Route>
  </Route>
)

const appRoutes = createMemoryRouter(routesElements)

export default appRoutes
