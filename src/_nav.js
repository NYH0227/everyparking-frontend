import React from "react";
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilStar,cilChatBubble } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'



const _nav = ([
  {
    component: CNavItem,
    name: 'Home',
    to: '/Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: '등록하기',
  },
  {
    component: CNavItem,
    name: '소유 공간 등록하기',
    to: '/myplace',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '소유 차 등록하기',
    to: '/mycar',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '이용하기',
  },
  {
    component: CNavItem,
    name: '장소 빌려주기',
    to: '/rent',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '장소 빌리기',
    to: '/borrow',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: "계정",
  },
  {
    component: CNavItem,
    name: '채팅',
    to: '/chatting',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    badge: {
      color: 'danger',
      text: '99',
      shape : 'rounded-pill',
    },
  },
  {
    component: CNavItem,
    name: '로그아웃',
    to: '/signout',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  }
])

export default _nav
