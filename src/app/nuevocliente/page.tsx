"use client"
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'

const NUEVO_CLIENTE = gql `
mutation nuevoCliente($input: ClienteInput){
  nuevoCliente(input: $input){
    nombre
    apellido
    empresa
    email
    telefono

  }
}
`;

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


const NuevoCliente = () => {
  //Router
  const router = useRouter()

  const [mensaje, guardarMensaje ] = useState(String)

  
  //MUTATION
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, {data: { nuevoCliente}}) {


      //OBTENER el objeto de cache q deseamos refresh
      const {obtenerClientesVendedor}:any = cache.readQuery({query: GET_CLIENT_USUARIO})

      //rescribimos el cache(nunca se modifica solo se reescribe)
      cache.writeQuery({
        query: GET_CLIENT_USUARIO,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente]
        }
      })


    }
  })

 
  

  const formik = useFormik({
    initialValues:{
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono:''
    },
    validationSchema: Yup.object({
        nombre: Yup.string()
          .required('El nombre es obligtorio'),
        apellido: Yup.string()
          .required('El apellido es obligtorio'),
        empresa: Yup.string()
          .required('El empresa es obligtorio'),
        email: Yup.string()
          .email('Email no válido')
          .required('El email es obligtorio'),

    }),
    onSubmit: async valores => {
      
      const{nombre, apellido, email, empresa, telefono} = valores
      
      try{

        const{data} = await nuevoCliente({
          variables:{
            input:{
              nombre,
              apellido,
              email,
              empresa,
              telefono
            }
          }
        })

        //console.log(data.nuevoCliente);
        setTimeout(()=>{

          router.push('/clientes')

        },2000 )

      }catch(error:any){
        guardarMensaje(error.message.replace('ApolloError: ', ' '))
       
        setTimeout( () => {
          guardarMensaje("")
        },2000)

      }
      
    }
  })


  const mostrarMensaje = ()=>{
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p className='text-cyan-950'>{mensaje}</p>
      </div>
    )
  }




  return (
    <div>
    <h1 className='text-2xl text-gray-800 font-light'>NuevoCliente</h1>
    {mensaje && mostrarMensaje()}
      <div className='flex justify-center mt-5'>

        <div className='w-full max-w-lg'>
            <form action="" className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
            >

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="nombre">Nombre: </label>
              <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="text" id='nombre' placeholder='Ingrese nombre'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}

                />



            </div>
            { formik.touched.nombre && formik.errors.nombre ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
                 <p ><strong>Error:</strong> {formik.errors.nombre}</p>
              </div>
            ): null }



            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="apellido">Apellido: </label>
              <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="text" id='apellido' placeholder='Ingrese apellido'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}

                />

            </div>
            { formik.touched.apellido && formik.errors.apellido ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
                 <p ><strong>Error:</strong> {formik.errors.apellido}</p>
              </div>
            ): null }


            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="empresa">Empresa: </label>
              <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="text" id='empresa' placeholder='Ingrese empresa'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}

                />

            </div>
            { formik.touched.empresa && formik.errors.empresa ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
                 <p ><strong>Error:</strong> {formik.errors.empresa}</p>
              </div>
            ): null }



            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email: </label>
              <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="email" id='email' placeholder='Ingrese email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}

                />
            </div>
            { formik.touched.email && formik.errors.email ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
                 <p ><strong>Error:</strong> {formik.errors.email}</p>
              </div>
            ): null }



            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="telefono">telefono: </label>
              <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="text" id='telefono' placeholder='Ingrese telefono'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}

                />

            </div>

    
      <input type="submit" className='bg-gray-700 !text-white w-full uppercase text-sm font-bold hover:bg-gray-900 py-3 rounded' value="Registrar Cliente" />

            </form>

        </div>

      </div>
    </div>
  )
}

export default NuevoCliente