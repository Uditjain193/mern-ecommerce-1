import {  resettokenandcredentials } from '../../redux/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Header = ({setopen}) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  function handlelogout(){
    //dispatch(logout())
    dispatch(resettokenandcredentials())
    sessionStorage.clear()
    navigate("/auth/login")
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setopen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handlelogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default Header