import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
    SELECCIONAR_CLIENTE,
SELECCIONAR_PRODUCTO,
CANTIDAD_PRODUCTOS,
ACTUALIZAR_TOTAL
} from "../../types"; 


const PedidoState = ({children}:any) => {

    //State de Pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    //modificar cliente
    const agregarCliente = (cliente:any) => {
        //console.log(cliente);

        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
        
    }
    //Modifica productos
    const agregarProducto = (productosSeleccionados:any) =>{

        let nuevoState;
        if(state.productos.length > 0 ){
            //Tomar el segundo arreglo, una copia para asignarlo
            nuevoState = productosSeleccionados.map ((producto:any) => {
                const nuevoObjeto  = state.productos.find( (productoState:any) => productoState.id === producto.id)
                return {...producto, ...nuevoObjeto}
            })
        }else{
            nuevoState = productosSeleccionados
            
            
        }


        //PedidoState.tsxconsole.log(productos);
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })

    }

    //Modifica cant de prodts
    const cantidadProductos = (nuevoProducto:any) => {

        //console.log(nuevoProducto);
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
        
    }


    const actualizarTotal = () => {

        //console.log('caculandoo');
        dispatch({
            type: ACTUALIZAR_TOTAL
            
        })

    }
    //------EXAMPLE
    // const holaMundoReducer = () => {
    //     console.log("Holaaaaaaaaaa");
        
    // }

    return (

        <PedidoContext.Provider
        
            value={
                {
                    cliente: state.cliente,
                    productos: state.productos,
                    total: state.total,
                    agregarCliente,
                    agregarProducto,
                    cantidadProductos,
                    actualizarTotal
                    // holaMundoReducer
                }
            }
        >
            {children}

        </PedidoContext.Provider>
    )

}

export default PedidoState