import React from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import SignIn from "./SignIn";

const Home = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
      <SignIn/>
    </div>
  )
}

export default Home
