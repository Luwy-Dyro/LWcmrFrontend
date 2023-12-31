"use client"
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'


import { useMutation } from '@apollo/client';
import { gql } from "@apollo/client";

import { useRouter } from 'next/navigation';

const NUEVA_CUENTA = gql`
mutation nuevoUsuario($input: UsuarioInput){
  nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
  
  }
}`;

const Nuevacuenta = () => {

  //State para el mensaje
  //const [mensaje, guardarMensaje ] = useState(null)
  const [mensaje2, guardarMensaje2 ] = useState(String)

  //Crear nuevo usuario
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA)
  //console.log(data);

  //Dirigir a login
  const router = useRouter();

  
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password:''
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es Obligatorio'),
      apellido: Yup.string().required('El apellido es Obligatorio'),
      email: Yup.string().email('El email es inválido').required('El email es Obligatorio'),
      password: Yup.string().required('El password es Obligatorio').min(6, 'Debe ser al menos 6 caracteres'),
    }),
    onSubmit: async valores => {
      //console.log(valores);
      const {nombre, apellido, email, password} = valores

      try{
        const {data } = await nuevoUsuario({
          variables: {
            input: {
              nombre, apellido, email, password
            }
          }
      
        })
        console.log(data);

        
        
     
        guardarMensaje2(`Se grabo satisfactorio user: ${data.nuevoUsuario.email}`)
          //guardarMensaje(data.nuevoUsuario.nombre) 
    
        setTimeout( () => {
          guardarMensaje2("")
          router.push('/login')
        },3000)



      }catch(error:any){
        guardarMensaje2(error.message.replace('ApolloError:', ' '))
        //guardarMensaje(error)
        //console.log(error);

        setTimeout( () => {
          guardarMensaje2("")
        },3000)
        
      }

      
    }
  });


  const mostrarMensaje = ()=>{
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p className='text-cyan-950'>{mensaje2}</p>
      </div>
    )
  }

  return (
    <>
    
    {mensaje2 && mostrarMensaje()}
    <h1 className="text-2xl  font-bold text-center">Nueva cuenta</h1>

    <div className="flex justify-center mt-5">

      <div className='w-full max-w-sm'>

        <form action="" className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
          onSubmit={formik.handleSubmit}
        >
        <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="nombre">Nombre: </label>
            <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="text" id='nombre' placeholder='Ingrese nombre'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />

            </div>
            { formik.touched.apellido && formik.errors.apellido ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
                 <p ><strong>Error:</strong> {formik.errors.apellido}</p>
              </div>
            ): null }
            
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email: </label>
            <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="email" id='email' placeholder='Ingrese email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />

            </div>
            { formik.touched.email && formik.errors.email ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
                 <p ><strong>Error:</strong> {formik.errors.email}</p>
              </div>
            ): null }

            <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password: </label>
            <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="password" id='password' placeholder='Ingrese password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />

            </div>
            { formik.touched.password && formik.errors.password ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
                 <p ><strong>Error:</strong> {formik.errors.password}</p>
              </div>
            ): null }

            <input type="submit"
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900' 
              value="Crear cuenta"
            />

        </form>

      </div>

    </div>
    </>

  )

}
 
export default Nuevacuenta;




