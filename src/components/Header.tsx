"use client";
import React from 'react'
import { useSuspenseQuery, useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { useRouter } from 'next/navigation';

const OBTENER_USER = gql` query
    obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
        }
    }
`;


const Header = () => {

    const router = useRouter();
    //query de apollo
    //const {data}: any = useSuspenseQuery(OBTENER_USER);
    //console.log(data);
    
    //const {nombre} = data.obtenerUsuario
   const {data, loading, error}: any = useQuery(OBTENER_USER);
    
//    console.log(data);
//    console.log(loading);
//    console.log(error);

    //
    if(loading) return null
    
    if(!data) {

        return router.push('/login')
    }
    
    
    
    const{nombre}:any = data.obtenerUsuario

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

  return (
    <div className='sm:flex justify-between mb-5 items-center'>

        <p className='mr-2 mb-5 lg:mb-0'>Hi, {nombre} | </p>
        <button 
            onClick={() => cerrarSesion()}
            type='button'
             className='bg-blue-800 w-full sm:w-auto  text-white py-1 px-3 rounded text-sm'>
            Cerrar Sesión
        </button>
    </div>
  )
}

export default Header

