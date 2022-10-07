import React, { useState } from "react";
import {} from "../src/components/AppSidebar"

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Borrow = React.lazy(() => import('./views/Borrow'))
const Rent = React.lazy(() => import('./views/Rent'))
const MyCar = React.lazy(() => import('./views/MyCar'))
const MyPlace = React.lazy(() => import('./views/MyPlace'))
const SignIn = React.lazy(()=> import('./views/SignIn'))
const SignUp = React.lazy(()=> import('./views/SignUp'))
const Signout = React.lazy(()=> import('./views/Signout'))
const Home = React.lazy(() => import('./views/Home'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/borrow', name: 'Select', element: Borrow },
  { path: '/rent', name: 'Rent', element: Rent },
  { path: '/mycar', name: 'MyCar', element: MyCar },
  { path: '/myplace', name: 'MyPlace', element: MyPlace },
  { path: '/signIn', name: 'SignIn', element: SignIn },
  { path: '/signUp', name: 'SignUp', element: SignUp },
  { path: '/signout', name: 'Signout', element: Signout },
  { path: '/range', name: 'Range', element: Range },
  { path: '/Home', name: 'Home', element: Home }
]

export default routes
