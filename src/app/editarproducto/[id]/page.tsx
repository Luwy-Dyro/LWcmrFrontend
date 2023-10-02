"use client";
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { gql, useMutation} from '@apollo/client';
import { useSuspenseQuery, useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Formik } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup'

const GET_PRODUCT = gql`
query obtenerProducto($id: ID!){
  obtenerProducto(id: $id){
        nombre
        precio
        existencia
  }
}
`

const UPDATE_PRODUCT = gql`
    mutation actualizarProducto($id: ID!, $input: ProductoInput){
    actualizarProducto(id: $id, input: $input){
        id
        nombre
        existencia
        precio
        
    }
    }
`


const EditarProducto = () => {
    
   const router = useRouter()

   const params = useParams();
   const {id}:any = params
   //console.log(id); 

   const {data, loading, error} = useQuery(GET_PRODUCT,{
    variables:{
      id
    }
   })

   //MUTATION
   const [actualizarProducto] = useMutation(UPDATE_PRODUCT)
 


    //Schem Validation
    const schemaValidation = Yup.object({
      nombre: Yup.string()
      .required('El nombre es obligatorio'),
      existencia: Yup.number()
          .required('Agregue cant. disponible')
          .positive('No se acepta números negativos')
          .integer('La existencia dene ser números enteros'),
      precio: Yup.number()
          .required('Agregue cant. disponible')
          .positive('No se acepta números negativos')

    })


    if(loading) return 'Loading...'

    if(!data) return 'Acción no permitida'

    const {obtenerProducto} = data


  //Modifica Client  en la BD
  const actualzarInfoProducto = async (valores:any) => {
    const {nombre, existencia, precio } = valores
    try{
      const {data} = await actualizarProducto({
        variables:{
          id,
          input:{
            nombre: nombre,
            existencia: parseInt(existencia),
            precio: parseFloat(precio),
          }
        }
      })

      //console.log(data);

      //TODO: rediccionar

      Swal.fire(
        'Actualizdo!',
        'El producto se actualizó correct',
        'success'
    )



      router.push('/productos')

    }catch(error){
      console.log(error);
      
    }
  }


  return (
    
    <>
    <h1 className='text-2xl text-gray-800 font-light'>Editar Cliente</h1>
    <div className='flex justify-center mt-5'>
    <div className='w-full max-w-lg'>

      <Formik
        enableReinitialize
        initialValues={obtenerProducto}
        validationSchema={schemaValidation}
        // onSubmit={ (values, functions) => {
        //     // console.log(values);
        //     // console.log(functions);            
        // }}
        onSubmit={ valores => {
          actualzarInfoProducto(valores)
      }}
      >

        { props => {
          //console.log(props);

          return (

          

        <form action="" className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
         onSubmit={props.handleSubmit}
        >

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="nombre">Nombre: </label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
            type="text" id='nombre' placeholder='Ingrese nombre'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.nombre}

            />



        </div>
        { props.touched.nombre && props.errors.nombre ? (
          <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
            <p ><strong>Error:</strong> Completar Campo</p>
          </div>
        ): null }
       


       <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="existencia">existencia: </label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
            type="text" id='existencia' placeholder='Ingrese existencia'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.existencia}

            />

        </div>
        { props.touched.existencia && props.errors.existencia ? (
          <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
             <p ><strong>Error:</strong> Completar campo</p>
          </div>
        ): null }


        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="precio">Precio: </label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
            type="text" id='precio' placeholder='Ingrese precio'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.precio}

            />

        </div>
        { props.touched.precio && props.errors.precio ? (
          <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
             <p ><strong>Error:</strong> Completar campo</p>
          </div>
        ): null }


          <input type="submit" className='bg-gray-700 !text-white w-full uppercase text-sm font-bold hover:bg-gray-900 py-3 rounded' value="Guardar" />
             </form>
                   )
          
                  }}
        </Formik>
    </div>

  </div>
  </>


  )


}

export default EditarProducto