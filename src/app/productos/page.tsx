"use client";
import React from 'react'
import Link from 'next/link'
import { gql } from '@apollo/client'
import Producto from '@/components/Producto'
import { useSuspenseQuery, useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation';

const GET_PRODUCTO_USER = gql`
query obtenerProductos{
  obtenerProductos{
         id
        nombre
        existencia
        precio
        creado 
  }
}`

const ProductosPage = () => {

  const router = useRouter()

  const {data,loading,error}:any = useSuspenseQuery(GET_PRODUCTO_USER);
  //console.log(data);

  if(loading) return 'Loading...'

  
  if(!data.obtenerProductos){   
    return router.push('/login')
  }


  return (
      
<div>
    <h1 className="text-2xl text-gray-800 font-bold">Productos</h1>

    <Link href="/nuevoproducto"  
      className='bg-blue-900 py-2 px-5 mt-5 inline-block !text-white rounded-sm text-xs hover:bg-gray-800 mb-3 uppercase font-bold'>
      Nuevo Producto
    </Link>


    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
           
          <tr >
             <th scope="col" className="px-6 py-3">Nombre</th>
             <th scope="col" className="px-6 py-3">Existencia</th>
             <th scope="col" className="px-6 py-3">Precio</th>
             {/* <th scope="col" className="px-6 py-3">Fecha_Creado</th> */}
             <th scope="col" className="px-6 py-3">Editar</th>
             <th scope="col" className="px-6 py-3">Eliminar</th>
            
          </tr>

        </thead>
        <tbody>
            {data.obtenerProductos.map((producto:any) =>(
              <Producto 
                key={producto.id} 
                producto={producto}
               />
            ))}
        </tbody>
      </table>

      </div>



    </div>

  )
}

export default ProductosPage
