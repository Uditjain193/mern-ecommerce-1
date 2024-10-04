import React from 'react'
import Header from './header'
import { Outlet } from 'react-router-dom'

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <Header />
      <main className="flex flex-col w-full">
        <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout