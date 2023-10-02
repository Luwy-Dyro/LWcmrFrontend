"use client"
import Link from 'next/link'
import React from 'react'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Pedido from '@/components/Pedido'

const GET_PEDIDOS = gql`
query obtenerPedidosVendedor{
  obtenerPedidosVendedor{

    id
    pedido {
      id
      nombre
      cantidad
    }
    cliente{
      id
      nombre
      apellido
      email
      telefono
    }
    vendedor
    total
    estado

  }
}
`


const PedidosPage = () => {

  const {data, loading, error} = useQuery(GET_PEDIDOS)

  //console.log(data);
  
  if(loading) return "Cargando..."

  const {obtenerPedidosVendedor} = data



  return (
    <div>
    <h1 className="text-2xl text-gray-800 font-bold">Pedidos</h1>

    <Link href="/nuevopedido"  
    className='bg-blue-900 py-2 px-5 mt-5 inline-block !text-white rounded-sm text-xs hover:bg-gray-800 mb-3 uppercase font-bold'>
    Nuevo Pedido
    </Link>

      {obtenerPedidosVendedor.length === 0 ? (

        <p className="mt-5 text-center text-2xl">No hay pedidos</p>
      ) : (
          
          obtenerPedidosVendedor.map( (pedido:any) =>(
            <Pedido 
              key={pedido.id}
              pedido={pedido}
            />

          ) )

      )
      }


  </div>
  )
}

export default PedidosPage