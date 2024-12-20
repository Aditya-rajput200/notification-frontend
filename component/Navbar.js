 "use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiLogOut } from "react-icons/fi";


function Navbar() {
  const[isLogin, setIsLogin] = useState(false)

  const checkToken = ()=>{
    const token = localStorage.getItem("authToken")
    if (token) {
      setIsLogin(true)
      
    }
}
 

 const LogOut = () =>{

  const remtoken  = localStorage.removeItem("authToken")
  setIsLogin(false)

 }

  useEffect(()=>{
    checkToken()
    
  },[]) 

  const navIcons = [
    { src: '/assets/icons/search.svg', alt: 'search' },
    { src: '/assets/icons/black-heart.svg', alt: 'heart' },
    { src: '/assets/icons/user.svg', alt: 'user' }
  ]
  
  return (
    <>
      <header className="w-full">
        <nav className='nav'>
          <Link href="/" className='flex items-center gap-1'>
            <Image
              src="/assets/icons/logo.svg"
              width={27}
              height={27}
              alt='logo'
            />
            <p className="nav-logo">Price
              <span className="text-primary">Track</span>
            </p>
          </Link>

          <div className="flex items-center gap-5">
            {/* {navIcons.map((icon) => (
              <Image
                alt={icon.alt}
                src={icon.src}
                key={icon.alt}  <Image 
                width={28}
                height={28}
                className="object-contain"
              />
            ))} */}

             <button> <Image width={28} height={28} src = '/assets/icons/search.svg' alt ='search'  className="object-contain" /></button>
            <Link href="/WishList"><button> <Image width={28} height={28} src = '/assets/icons/black-heart.svg' className="object-contain" alt ='hert'  /></button></Link>
             
                 
             
             
             {isLogin? <button className=' bg-red-100 text-red-600 flex justify-evenly h-10 w-28 pl-3 font-bold pt-2 rounded-md hover:bg-red-500 hover:text-white' onClick={()=>LogOut()} >Log Out < FiLogOut className='mt-1 '/>
             </button>  : <Link href="/Login" ><button> <Image width={28} height={28} src = '/assets/icons/user.svg' alt ='user'  className="object-contain" /></button></Link>}
            

          </div>
        </nav>
      </header>
      <section className="border-2 border-slate-200" ></section>
    </>
  )
}

export default Navbar
   