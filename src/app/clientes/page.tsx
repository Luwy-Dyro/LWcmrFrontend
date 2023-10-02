"use client";
import React from 'react'
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cliente from '@/components/Cliente';

const GET_CLIENT_USUARIO = gql` query
 obtenerClientesVendedor{
  obtenerClientesVendedor{
    id
    nombre
    apellido
    empresa
    email
  }
}`;


const ClientesPage = () => {

  const router = useRouter();

  //Consulta APollo
  const {data}: any = useSuspenseQuery(GET_CLIENT_USUARIO);
  //console.log(data);
  
  if(!data.obtenerClientesVendedor) {

    return router.push('/login')
  }

  return (
    <div>
    <h1 className="text-2xl text-gray-800 font-bold">Clientes</h1>

    <Link href="/nuevocliente" 
      className='bg-blue-900 py-2 px-5 mt-5 inline-block !text-white rounded-sm text-xs hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center rounded'>
      Nuevo Cliente
    </Link>


    <div className="overflow-x-scroll shadow-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          
          <tr >
             <th scope="col" className="px-6 py-3">Nombre</th>
             <th scope="col" className="px-6 py-3">Empresa</th>
             <th scope="col" className="px-6 py-3">Email</th>
             <th scope="col" className="px-6 py-3">Editar</th>
             <th scope="col" className="px-6 py-3">Eliminar</th>
          </tr>

        </thead>
        <tbody>
            {data.obtenerClientesVendedor.map((cliente:any) =>(
              <Cliente 
                key={cliente.id} 
                cliente={cliente}
               />
            ))}
        </tbody>
        
      </table>

    </div>



    </div>
  )
}

export default ClientesPage