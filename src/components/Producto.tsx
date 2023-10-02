"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { gql, useMutation } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation'


const ELIMINAR_PROD = gql`

mutation eliminarProducto($id: ID!){
  eliminarProducto(id: $id)
}
  `

const GET_PRODUCTO_USER = gql`
query obtenerProductos{
  obtenerProductos{
         id
        nombre
        existencia
        precio
        creado 
  }
}`


const Producto = ( {producto}:any ) => {

    const router = useRouter()

    const{ nombre, existencia, precio, id } = producto
    
    //Delete prod
    const [eliminarProducto] = useMutation(ELIMINAR_PROD,{

      update(cache){
        //get copia de objeto cache
        const {obtenerProductos}:any= cache.readQuery({query:GET_PRODUCTO_USER })

        //Reescribir cache
        cache.writeQuery({
            query: GET_PRODUCTO_USER,
            data:{
              obtenerProductos: obtenerProductos.filter((productActual:any) => productActual.id !== id)

            }
        })
      }
    })


    const confirmarEliminarProd = () => {
        
        
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then( async (result) => {
          // if (result.isConfirmed) {
          if (result.value) {
            try{
                
              const {data} = await eliminarProducto({
                variables:{
                  id
                }
              })
              //console.log(data);

              Swal.fire(

                'Succesful',
                data.eliminarProducto,
                'success'

              )
              

            }catch(err){
              console.log(err);
              
              
            }
             


          }
        })

  }


  const editarProducto = ()=>{

      router.push(`/editarproducto/${id}`)

    }
    
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={producto.id}>
              
           
    <td className='border px-4 py-2'>{nombre}  </td>
    <td className='border px-4 py-2'>{existencia}  </td>
    <td className='border px-4 py-2'>$ {precio} </td>
    {/* <td className='border px-4 py-2'>{creado} </td> */}
    <td className='border px-4 py-2'>
        
        <button
        type='button'
        className='flex justify-center items-center bg-green-600 py-2 px-4 w-250 mx-auto text-white rounded text-xs uppercase font-bold '
        onClick={()=> editarProducto()}
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
        onClick={()=> confirmarEliminarProd()}
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

export default Producto

