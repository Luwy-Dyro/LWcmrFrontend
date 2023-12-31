import React, {useContext} from 'react'
import PedidoContext from '../../../context/pedidos/PedidoContext'
import ProductoResumen from './ProductoResumen'

const ResumenPedido = () => {

    const pedidoContext = useContext(PedidoContext)
    const {productos}:any = pedidoContext

    console.log(productos);
    

  return (
    <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold '> 3. Ajusta cantidad de Producto</p>

        { 
            productos.length > 0 ? (
                <>
                {/* <p>Si hay productos</p> */}
                {productos.map ((producto:any) => (
                    <ProductoResumen
                        key={producto.id}
                        producto={producto}
                    
                    />
                ))}
                </>
            ) : (
                <p className='mt-5 text-sm'> No hay productos</p>
            )
        
        }
    </>
  )
}

export default ResumenPedido