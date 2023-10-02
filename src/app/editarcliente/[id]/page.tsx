"use client";
import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { useSuspenseQuery, useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useParams, useRouter } from 'next/navigation'
import { Formik } from 'formik';
import Swal from 'sweetalert2'
import * as Yup from 'yup'

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

const GET_CLIENT = gql`
query obtenerCliente($id: ID!){
  obtenerCliente(id: $id){
            id
            nombre
            apellido
            email
            empresa
            telefono
  }
}
`


const UPDATE_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput){
    actualizarCliente(id: $id, input: $input){
            id
            nombre
            apellido
            email
            empresa
            telefono
    }
  }
`

const EditarCliente = () => {

  // const user = await getCliente(params.id)
  // console.log(user);
    const router = useRouter()

    const params = useParams();
    const {id}:any = params
    console.log(id);
    
    //Consulta para obtener cliente 
  const {data, loading, error} = useQuery(GET_CLIENT,{
    variables:{
      id
    }
  })

  //Actualizar Cliente
  //const [actualizarCliente] = useMutation(UPDATE_CLIENTE)

  const [actualizarCliente] = useMutation(UPDATE_CLIENTE, {
    update(cache, { data: { actualizarCliente } }) {
     
      // Actulizar Clientes
      const { obtenerClientesVendedor }:any = cache.readQuery({
        query: GET_CLIENT_USUARIO
      });
 
      const clientesActualizados = obtenerClientesVendedor.map((cliente:any) =>
        cliente.id === id ? actualizarCliente : cliente
      );
 
      cache.writeQuery({
        query: GET_CLIENT_USUARIO,
        data: {
          obtenerClientesVendedor: clientesActualizados
        }
      });
 
      // Actulizar Cliente Actual
      cache.writeQuery({
        query: UPDATE_CLIENTE,
        variables: { id },
        data: {
          obtenerCliente: actualizarCliente
        }
      });
    }
  });




  //Schem Validation
  const schemaValidation = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligtorio'),
    apellido: Yup.string()
      .required('El apellido es obligtorio'),
    empresa: Yup.string()
      .required('El empresa es obligtorio'),
    email: Yup.string()
      .email('Email no válido')
      .required('El email es obligtorio')

  })

  if(loading){
    return "Cargando...."
  }



  //console.log(data.obtenerCliente);
  
  const {obtenerCliente} = data

  //Modifica Client  en la BD
  const actualzarInfoCliente = async (valores:any) => {
    const {nombre, apellido, email, empresa, telefono} = valores
    try{
      const {data} = await actualizarCliente({
        variables:{
          id,
          input:{
            nombre, apellido, email, empresa, telefono
          }
        }
      })

      //console.log(data);

      //TODO: rediccionar

      Swal.fire(
        'Actualizdo!',
        'El usuario se actualizó correct',
        'success'
    )



      router.push('/clientes')

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
          validationSchema={schemaValidation}
          enableReinitialize
          initialValues={obtenerCliente}
          // onSubmit={ (values, functions) => {
          //     // console.log(values);
          //     // console.log(functions);            
          // }}
          onSubmit={ (values) => {
            actualzarInfoCliente(values)
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
              <p ><strong>Error:</strong> {props.errors.nombre}</p>
            </div>
          ): null }
         


          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="apellido">Apellido: </label>
            <input 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
              type="text" id='apellido' placeholder='Ingrese apellido'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.apellido}

              />

          </div>
          { props.touched.apellido && props.errors.apellido ? (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
              <p ><strong>Error:</strong> {props.errors.apellido}</p>
            </div>
          ): null }


          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="empresa">Empresa: </label>
            <input 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
              type="text" id='empresa' placeholder='Ingrese empresa'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
               value={props.values.empresa}

              />

          </div>
          { props.touched.empresa && props.errors.empresa ? (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
              <p ><strong>Error:</strong> {props.errors.empresa}</p>
            </div>
          ): null }



          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email: </label>
            <input 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
              type="email" id='email' placeholder='Ingrese email'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
               value={props.values.email}

              />
          </div>
          { props.touched.email && props.errors.email ? (
            <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
              <p ><strong>Error:</strong> {props.errors.email}</p>
            </div>
          ): null }



          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="telefono">telefono: </label>
            <input 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
              type="text" id='telefono' placeholder='Ingrese telefono'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
               value={props.values.telefono}

              />

          </div>


            <input type="submit" className='bg-gray-700 !text-white w-full uppercase text-sm font-bold hover:bg-gray-900 py-3 rounded' value="Editar Cliente" />
               </form>
                     )
            
                    }}
          </Formik>
      </div>

    </div>
    </>
  )
}

export default EditarCliente