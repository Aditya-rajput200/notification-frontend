import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function Navbar() {
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
            {navIcons.map((icon) => (
              <Image
                alt={icon.alt}
                src={icon.src}
                key={icon.alt} 
                width={28}
                height={28}
                className="object-contain"
              />
            ))}
          </div>
        </nav>
      </header>
      <section className="border-2 border-slate-200" ></section>
    </>
  )
}

export default Navbar
   