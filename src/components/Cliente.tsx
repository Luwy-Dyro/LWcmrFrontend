"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import Router from 'next/router'

const ELIMINAR_CLIENT = gql`
mutation eliminarCliente($id: ID!){
  eliminarCliente(id: $id)
}
`


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


const Cliente = ({cliente}:any) => {

    
    const router = useRouter()

    const [eliminarCliente] = useMutation(ELIMINAR_CLIENT,{
            update(cache){
                //get copia de objeto cache
                const {obtenerClientesVendedor}:any= cache.readQuery({query:GET_CLIENT_USUARIO })

                //Reescribir cache
                cache.writeQuery({
                    query: GET_CLIENT_USUARIO,
                    data:{
                        obtenerClientesVendedor: obtenerClientesVendedor.filter((clienteActual:any) => clienteActual.id !== id)

                    }
                })
            }
    })

    const {nombre, apellido, empresa, email, id} = cliente

    const confirmarEliminar = () => {
        
        
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
                    //Eliminar por ID

                    const { data } = await eliminarCliente({
                        variables:{
                            id
                        }
                    })
                    //console.log("Eliminando: ", id);
                    //console.log(data);
                    Swal.fire(
                        'Deleted!',
                        //'Your file has been deleted.',
                        data.eliminarCliente,
                        'success'
                    )

                }catch(err){
                    console.log(err);
                    
                }


            }
          })

    }

    const editarCliente = ()=>{
        router.push(`/editarcliente/${id}`)
        // router.push({
        //     pathname: "/editarcliente/[id]",
        //     query: { id }
        // })
        
    }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={cliente.id}>
              
           
        <td className='border px-4 py-2'>{nombre} {apellido} </td>
        <td className='border px-4 py-2'>{empresa}  </td>
        <td className='border px-4 py-2'>{email} </td>
        <td className='border px-4 py-2'>
            
            <button
            type='button'
            className='flex justify-center items-center bg-green-600 py-2 px-4 w-250 mx-auto text-white rounded text-xs uppercase font-bold '
            onClick={()=> editarCliente()}
            >
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>


            Editar 
            </button>
            
        </td>

        <td className='border px-4 py-2'>
            
            <button
            type='button'
            className='flex justify-center items-center bg-red-700 py-2 px-4 w-250 mx-auto text-white rounded text-xs uppercase font-bold '
            onClick={()=> confirmarEliminar()}
            >
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            Eliminar 
            </button>
            
             </td>
    </tr>
  )
}

export default Cliente