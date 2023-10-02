import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client';

const UPDATE_PEDIDO = gql`
mutation actualizarPedido($id: ID!, $input: PedidoInput){
  actualizarPedido(id: $id, input: $input){
    estado 
  }
}
`

const DELETE_PEDIDO = gql`
mutation eliminarPedido($id: ID!){
  eliminarPedido(id: $id)
}
`

const GET_PEDIDOS = gql`
query obtenerPedidosVendedor{
  obtenerPedidosVendedor{
    id
  }
}
`


const Pedido = ({pedido}:any) => { 
  
  const [actualizarPedido] = useMutation(UPDATE_PEDIDO)
  const [eliminarPedido] = useMutation(DELETE_PEDIDO, {

    update(cache){
      const {obtenerPedidosVendedor}:any = cache.readQuery({
        query: GET_PEDIDOS
      })

      cache.writeQuery({
        query: GET_PEDIDOS,
        data:{
          obtenerPedidosVendedor: obtenerPedidosVendedor.filter((pedido:any) => pedido.id !== id)
        }

      })
    }

  })
  
  
  
  const {id, total, cliente: {nombre, apellido, telefono, email}, estado, cliente} = pedido
  //console.log(pedido);
  
  //MUTATION
    
  const [estadoPedido, setEstadoPedido] = useState(estado);

  const [clase, setClase] = useState('');

  useEffect ( () => {

    if(estadoPedido){
      setEstadoPedido(estadoPedido)
    }
    clasePedido();
  }, [estadoPedido ])


  const clasePedido = () => {

    if(estadoPedido === 'PENDIENTE') {

      setClase ('border-yellow-500')

    }else if (estadoPedido === 'COMPLETADO'){
      setClase ('border-green-500')

    }else{
      setClase ('border-red-800')

    }

  }

  const cambiarEstadoPedido = async (nuevoEstado:any) => {
    //console.log(nuevoEstado);
    try{

      const {data} = await actualizarPedido({
          variables:{
            id,
            input:{
              estado: nuevoEstado,
              cliente: cliente.id
            }
          }
      })
      //console.log(data);
      setEstadoPedido(data.actualizarPedido.estado)
      

    }catch (error){
      console.log(error);
      
    }
    
  }

  const confirmarEliminarPedido = () => {
       
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {

               try{

                const {data} = await eliminarPedido({

                  variables:{
                    id
                  }
                })

                Swal.fire(
                  'Eliminado',
                  data.eliminarPedido,
                  'success'

                )


               }catch(error){
                console.log(error);
                

               }

            }
          })

    }



  return (
    <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
      <div>
        <p className='font-bold text-gray-800'>Cliente: {nombre} {apellido}</p>

        {email && (

            <p className='flex items-center mt-2'>
              
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>

              {email}
            </p>

        )}

          {telefono && (

            <p className='flex items-center mt-2'>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>

                {telefono}
            </p>
          )}


        <h2 className='text-gray-800 font-bold mt-10'> Estado Pedido</h2>

        <select 
          className='mt-2 appearance-none bg-blue-600 border border-e-blue-600 !text-white p-2 text-center rounded leading-tight focus:outline-none focus: bg-blue-600 focus: border-blue-500 uppercase text-xs font-bold'
          value={estadoPedido}
          onChange={ e => cambiarEstadoPedido(e.target.value)}
        >
          <option value="COMPLETADO">COMPLETADO</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CANCELADO">CANCELADO</option>

        </select>
      </div>

      <div>
        <h2 className='text-gray-800 font-bold mt-2'>Resumen de Pedido</h2>

        { pedido.pedido.map( (articulo:any) => (

          <div key={articulo.id} className='mt-4'> 
          
            <p className='text-sm text-gray-600'>Producto: {articulo.nombre}</p>
            <p className='text-sm text-gray-600'>Cantidad: {articulo.cantidad}</p>

          </div>

        )) }

        <p className='text-gray-800 mt-3 font-bold'>Total a pagar: 
          <span className='font-light'> $ {total}</span>
        </p>

        <button
          className='flex items-center mt-4 bg-red-800  px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold'
          onClick={  () => confirmarEliminarPedido()}

        >Eliminar Pedido

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>

      </div>


    </div>
  )
}

export default Pedido