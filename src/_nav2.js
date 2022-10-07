import React, { useState } from "react";
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilStar } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav2 = ([
  {
    component: CNavItem,
    name: 'Home',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: "계정",
  },
  {
    component: CNavItem,
    name: '회원가입',
    to: '/signup',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '로그인',
    to: '/signin',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  }
])

export default _nav2
