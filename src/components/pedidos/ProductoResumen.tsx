import React, {useContext, useState, useEffect} from 'react'
import PedidoContext from '../../../context/pedidos/PedidoContext'


const ProductoResumen = ({producto}:any) => {

    
    const pedidoContext = useContext(PedidoContext)
    const {cantidadProductos, actualizarTotal}:any = pedidoContext

    const [cantidad, setCantidad] = useState(0)

    useEffect(() =>{

        actualizarCantidad()
        actualizarTotal()
    },[cantidad] )

    const actualizarCantidad = () => {
        const nuevoProducto = {...producto, cantidad: Number(cantidad)}
        cantidadProductos(nuevoProducto);
        
    }
    //console.log(cantidadProductos);



    const {nombre, precio} = producto

  return (
    <div className='md:flex md:justify-between md:items-center mt-5'>
        {/* {producto.nombre} */}
        <div className='md:w-3/4 mb-1 md:mb-0'>
            <p className='text-sm'>{nombre}</p>
            <p> $ {precio}</p>
        </div>

        <input type='number'
            placeholder='Cantidad'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4 '
            onChange={ (e:any) => setCantidad(e.target.value)
            }
            value = {cantidad}
        />
    </div>
  )
}

export default ProductoResumen