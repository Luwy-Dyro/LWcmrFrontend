"use client"
import React from 'react'
import  Link from "next/link";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Navigation = () =>  {

  //routing de next
  const router = useRouter();
  const pathname = usePathname()

  //console.log(pathname)
  


  return (

      <aside className="bg-gray-800 sm:w-64 xl:w-64 sm:min-h-screen p-5">
        
        <div>
          <p className='text-white text-2xl font-black pb-5'>LUWY Clients</p>
        </div>
        <nav className='list-none'>
            <li className={pathname === "/" ? "bg-slate-700 p-2" : "p-0"}>
              <Link href="/" className='text-white mb-2 block'  > Home</Link></li>
            {/* <li className={pathname === "/about" ? "bg-slate-700 p-2" : "p-0"}><Link href="/about" className='text-white mb-2 block'>About</Link></li>
            <li className={pathname === "/services" ? "bg-slate-700 p-2" : "p-0"}><Link href="/services" className='text-white mb-2 block'>Services</Link></li> */}
            <li className={pathname === "/clientes" ? "bg-slate-700 p-2" : "p-0"}><Link href="/clientes" className='text-white mb-2 block'>Clientes</Link></li>
            <li className={pathname === "/pedidos" ? "bg-slate-700 p-2" : "p-0"}><Link href="/pedidos" className='text-white mb-2 block'>Pedidos</Link></li>
            <li className={pathname === "/productos" ? "bg-slate-700 p-2" : "p-0"}><Link href="/productos" className='text-white mb-2 block'>Productos</Link></li>

        </nav>

    
        <div className='sm: mt-10'>
          <p className='text-white text-xl font-black pb-5'>Otras Opciones</p>
        </div>

        <nav className='mt-3 list-none'>

        <li className={pathname === "/mejoresvendedores" ? "bg-slate-700 p-2" : "p-0"}>
            <Link href="/mejoresvendedores" className='text-white mb-2 block'>Mejores vendedores</Link>
            
          </li>
        <li className={pathname === "/mejoresclientes" ? "bg-slate-700 p-2" : "p-0"}>
            <Link href="/mejoresclientes" className='text-white mb-2 block'>Mejores Clientes</Link>
          </li>


        </nav>

      
      </aside>
                
    
  )
}

export default Navigation