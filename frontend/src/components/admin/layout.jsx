import React, { useState } from 'react'
import Header from './header'
import Sidebar from './sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const [opensidebar,setopensidebar]=useState(false)
  return (
    <div className="flex min-h-screen w-full">
    {/* admin sidebar */}
    <Sidebar open={opensidebar} setopen={setopensidebar}/>
    <div className="flex flex-1 flex-col">
      {/* admin header */}
      <Header setopen={setopensidebar}/>
      <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  </div>
  )
}

export default AdminLayout