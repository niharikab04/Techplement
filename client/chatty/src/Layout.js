import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import HomePage from './components/HomePage'
export default function Layout() {
  return (
  <main>
    <Header/>
<HomePage/>
    <Outlet/>
  </main>
  )
}
