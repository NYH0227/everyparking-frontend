import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import navigation2 from '../_nav2'
import { LoginContext } from "../views/DefaultLayout";


const AppSidebar = () => {

  const { login, setLogin } = useContext(LoginContext);

  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  if(!login){
    return (
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={navigation}/>
          </SimpleBar>
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebar>
    )
  }else {
    return (
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: "set", sidebarShow: visible });
        }}
      >
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={navigation2} />
          </SimpleBar>
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({ type: "set", sidebarUnfoldable: !unfoldable })}
        />
      </CSidebar>
    );
  }

}

export default AppSidebar
