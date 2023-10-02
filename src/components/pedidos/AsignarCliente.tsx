"use client"
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { gql } from '@apollo/client'
import { useQuery, useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import PedidoContext from '../../../context/pedidos/PedidoContext'

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


// const clientes = [
//   { id: 1, nombre: 'Juan' },
//   { id: 2, nombre: 'Luis' },
//   { id: 3, nombre: 'Jose' }
// ]


const AsignarCliente = () => {

    const [cliente, setCliente] = useState([]);

    //Context de Pedidos
    const pedidoContext = useContext(PedidoContext)
    //console.log(pedidoContext);

    const {agregarCliente}:any = pedidoContext


    

    // Consultar BD
    const {data, loading, error} = useQuery(GET_CLIENT_USUARIO)
    //console.log(data);
  
    useEffect( ()=>{
      //console.log(cliente);
      agregarCliente(cliente);
    }, [cliente]
  
    )
  
    const seleccionarCliente = (clientes:any) => {
        setCliente(clientes)
    }

    //Result 

    if(loading) return null

    const {obtenerClientesVendedor} = data

    

  return (
    <>
    <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold '> 1. Asignar cliente al pedido</p>
    <Select 
        className='mt-3'
        options={obtenerClientesVendedor} 
        // isMulti={true}
        onChange={ opcion => seleccionarCliente(opcion)}
        getOptionValue={ (clientes:any) => clientes.id  }
        getOptionLabel={ (clientes:any) => clientes.nombre }
        placeholder="Busque Cliente"
        noOptionsMessage={() => "No hay resultados"}
        />
    </>


  )
}

export default AsignarCliente