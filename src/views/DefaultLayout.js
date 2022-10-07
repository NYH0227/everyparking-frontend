import React, { createContext } from "react";
import { AppContent, AppSidebar, AppHeader } from '../components'

export const LoginContext = createContext({ login: localStorage.getItem("jwt") !== (undefined || null) ? true : false, setLogin: () => {} })


const DefaultLayout = () => {

  return (
    <div>
      <AppSidebar/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
