"use client"
import React, { useContext, useState } from 'react'
import AsignarCliente from '@/components/pedidos/AsignarCliente'
import AsignarProductos from '@/components/pedidos/AsignarProductos'
import ResumenPedido from '@/components/pedidos/ResumenPedido'
import Total from '@/components/pedidos/Total'
//Context de Pedidos
import PedidoContext from '../../../context/pedidos/PedidoContext'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput){
    nuevoPedido(input: $input){
        id
    }
  }
`


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

const NuevoPedido = () => {

  const router = useRouter();

  const [mensaje, setMensaje] = useState(String)

  //Utilizar context y extraes sus funciones y valores
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total}:any = pedidoContext 
  //console.log(productos);
  


  //MUtation para crear nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {

    update(cache, {data: {nuevoPedido}}){

      const {obtenerPedidosVendedor}:any = cache.readQuery({

          query: GET_PEDIDOS
      })

      cache.writeQuery({
        query: GET_PEDIDOS,
        data: {
          obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
        }

      })
    }

  })



  const validarPedidos = () =>{
    return !productos.every( (producto:any) => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? "opacity-50 cursor-not-allowed" : ""
    
  }


  const crearNuevoPedido = async () =>{

    const { id } = cliente;
    
    //Remover lo no deseado
    const pedido = productos.map(({__typename, existencia,creado, ...producto}:any) => producto )
    //console.log(pedido);

    
    try{
      const {data} = await nuevoPedido({
        variables:{
          input:{
            pedido,
            total,
            cliente: id
          }

        }
      })
      //console.log(data);
      //Redireccionar
      router.push('/pedidos')

      //Mostrar SwitAlert
      Swal.fire(
        'Correcto',
        'El pedido se registró correctamente',
        'success'

      )

      

    }catch(error:any){
      //console.log(error);

      setMensaje(error.message.replace('ApolloError:', ' '))
      //setMensaje(error)
      //console.log(error);

      setTimeout( () => {
        setMensaje("")
      },3000)
    
    }
    
  }

  const mostrarMensaje = () => {

    return (

      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{mensaje}</p>
      </div>

    )

  }

  return (
    <div>
    <h1 className='text-2xl text-gray-800 font-light mb-3'>Crear Nuevo Pedido</h1>

    {mensaje && mostrarMensaje()}

    <div className='flex justify-center mt-5'>

      <div className='w-full max-w-lg'>

            <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido/>
          <Total />

          <button
          type='button'
          className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedidos()}`}
          onClick={ () => crearNuevoPedido()}
          >
            Registrar Pedido
          </button>

      </div>
  
    </div>

    </div>
  )
}

export default NuevoPedido