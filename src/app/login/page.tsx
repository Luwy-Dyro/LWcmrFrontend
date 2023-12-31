"use client"
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'

const AUTENTICAR_USER = gql`
  mutation autenticarUsuario($input: AutenticarInput){
    autenticarUsuario(input: $input){
        token
    }
  }
`;


const Login = () => {

  //Mutation crear user
  const[autenticarUsuario] = useMutation(AUTENTICAR_USER);
  const [mensaje, guardarMensaje ] = useState(String)

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es válido').required('El email es Obligatorio'),
      password: Yup.string().required('El password es obligatorio')
    }), 
    onSubmit: async valores => {
      //console.log(valores);
      const {email, password} = valores
      try{

        const {data} = await autenticarUsuario({
          variables:{
            input:{
              email,
              password
            }
          }
        })
        //console.log(data);
        
        guardarMensaje(`Autentificando user...`)
        
        //Guardar Token en LocalStore
        // setTimeout(() =>{
        //   const { token } = data.autenticarUsuario;
        //   localStorage.setItem('token', token);
        // },1000 )
        // useEffect( () => {

        // }. [])
          const { token } = data.autenticarUsuario;
          localStorage.setItem('token', token);
          router.push('/productos')

        
        //Redirect
  
      // setTimeout( () => {
      //   guardarMensaje("")
      //   router.push('/productos')
      // },2000)
      // setTimeout( () => {
      //   guardarMensaje("")
      //   router.push('/productos')
      // },500)


      }catch(error:any){
        //console.log(error);

        guardarMensaje(error.message.replace('ApolloError:', ' '))
        //guardarMensaje(error)
        //console.log(error);

        setTimeout( () => {
          guardarMensaje("")
        },3000)
        
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
    <>
    <h1 className="text-2xl  font-bold text-center">Login</h1>

    {mensaje && mostrarMensaje()}
    <div className="flex justify-center mt-5">

      <div className='w-full max-w-sm'>

        <form action="" className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
        onSubmit={formik.handleSubmit}
        >
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
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password: </label>
            <input 
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
                type="password" id='password' placeholder='Ingrese password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                
                />

            </div>
            
            { formik.touched.password && formik.errors.password ? (
              <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
                 <p ><strong>Error:</strong> {formik.errors.password}</p>
              </div>
            ): null }

            <input type="submit"
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:bg-gray-900' 
              value="Iniciar Sesión"
            />

        </form>

      </div>

    </div>
    </>

  )
}

export default Login