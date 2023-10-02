import React, {useEffect, useState, useContext} from 'react'
import Select  from 'react-select'
import { gql } from '@apollo/client'
import { useQuery, useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import PedidoContext from '../../../context/pedidos/PedidoContext'


const GET_PRODUCTOS = gql`
query obtenerProductos{
  obtenerProductos{
         id
        nombre
        existencia
        precio
        creado 
  }
}`


const AsignarProductos = () => {

    //state local component
    const [productos, setProdcutos ] = useState([])

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext)
    const {agregarProducto}:any = pedidoContext



    //consulta BD
    const {data, loading, error} = useQuery(GET_PRODUCTOS)
    //console.log(data);


    //Pasar funciones
    useEffect(() => {
      //function to send PedidoState
      agregarProducto(productos);   
    
    }, [productos])
    



    const seleccionarProducto = (producto:any) => {
        setProdcutos(producto);      

    }



    if(loading) return null

    const {obtenerProductos} = data

    

  return (
    
    <>
    <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold '> 2. Selecciona producto</p>
    <Select 
        className='mt-3'
        options={obtenerProductos} 
        isMulti={true}
        onChange={ opcion => seleccionarProducto(opcion)}
        getOptionValue={ (opcion:any) => opcion.id  }
        getOptionLabel={ (opcion:any) => `${opcion.nombre} - ${opcion.existencia} Disponibles` }
        placeholder="Buscar Producto"
        noOptionsMessage={() => "No hay resultados"}
        />
    </>


  )
}

export default AsignarProductos