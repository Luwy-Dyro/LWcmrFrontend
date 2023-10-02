import React, { useContext } from 'react'
import PedidoContext from '../../../context/pedidos/PedidoContext'



const Total = () => {

    //Context de pedidos
    const pedidoContext = useContext(PedidoContext)
    const {total}:any = pedidoContext
  
  

  return (
    <div className='flex items-center mt-5 justify-between bg-gray-100 p-3 border-solid border-1 border-gray-400 '>
        <h2>Total a pagar</h2>
        <p className='text-gray-800 mt-0 '>$ {total}</p>
    </div>
  )
}

export default Total