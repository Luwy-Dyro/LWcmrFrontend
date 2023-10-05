"use client"
import Navigation from '@/components/Navigation'
import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation';

import { ApolloWrapper } from './ApolloWrapper'

// const inter = Inter({  subsets: ['latin'] })

import PedidoState from '../../context/pedidos/PedidoState'

// export const metadata: Metadata = {
//   title: 'LW - CRM PEDIDOS',
//   description: 'CRM Manteniemiento de Pedidos',
// }




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const router = useRouter();
  const pathname = usePathname()

  return (
    <html lang="es" >

      {/* <body className={inter.className}> */}
      <body >


    {pathname === '/login' || pathname === '/nuevacuenta' ? (

      <div className=" bg-gray-800  min-h-screen text-white flex flex-col justify-center">

          <div>

          <ApolloWrapper>{children}</ApolloWrapper>
          </div>

      </div>

    ): (

      <div className="bg-gray-200 min-h-screen ">
        <div className="sm:flex min-h-screen">
          
          <Navigation />

          <main className="  xl:w-full sm:w-full p-5 dasboard" >

  

          <ApolloWrapper>
            
            <PedidoState>
               <Header />
                {children}
                
            </PedidoState>
          </ApolloWrapper>
          
          </main>

        </div>
        
      </div>

    )}


      </body>

    </html>
  )
}
