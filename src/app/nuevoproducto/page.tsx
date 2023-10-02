"use client"
import React from 'react'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup' 

const NEW_PRODUCT = gql`
  mutation nuevoProducto($input: ProductoInput){
    nuevoProducto(input: $input){
          nombre
          existencia
          precio
    }
  }
`;

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



const PageNuevoProducto = () => {

    const router = useRouter()

    //Mutation
    const [nuevoProducto] = useMutation(NEW_PRODUCT,{
        update(cache, {data: {nuevoProducto}}){

          //Obtener objeto de cache
          const{obtenerProductos}:any = cache.readQuery({query: GET_PRODUCTO_USER})

          //reescribir objeto

          cache.writeQuery({
            query: GET_PRODUCTO_USER,
            data:{
              obtenerProductos: [...obtenerProductos, nuevoProducto]
            }
          })


        }

    })

    //Form products
    const formik = useFormik({
        initialValues:{
            nombre: '',
            existencia:'',
            precio:''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre es obligatorio'),
            existencia: Yup.number()
                .required('Agregue cant. disponible')
                .positive('No se acepta números negativos')
                .integer('La existencia dene ser números enteros'),
            precio: Yup.number()
                .required('Agregue cant. disponible')
                .positive('No se acepta números negativos')
        }),
        onSubmit: async valores => {


          
            const {nombre, existencia, precio} = valores
            
            //console.log(valores, "ssss");
            try{
                const {data} = await nuevoProducto({
                    variables:{
                        input:{
                            nombre: nombre,
                            existencia: parseInt(existencia),
                            precio: parseFloat(precio),
                        }
                    }
                })
                //console.log(data.nuevoProducto);
                //Swal
                Swal.fire(
                  'Creado',
                  'Se creó satisfactoriamente',
                  'success'
                )

                router.push('/productos')

            }catch(error:any){
                console.log(error);
                
            }
        }
    })

  return (
    <div>
    <h1 className='text-2xl text-gray-800 font-light'>Nuevo Producto</h1>

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
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="existencia">existencia: </label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
            type="text" id='existencia' placeholder='Ingrese existencia'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.existencia}

            />

        </div>
        { formik.touched.existencia && formik.errors.existencia ? (
          <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
             <p ><strong>Error:</strong> {formik.errors.existencia}</p>
          </div>
        ): null }


        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="precio">Precio: </label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow'
            type="text" id='precio' placeholder='Ingrese precio'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.precio}

            />

        </div>
        { formik.touched.precio && formik.errors.precio ? (
          <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ' >
             <p ><strong>Error:</strong> {formik.errors.precio}</p>
          </div>
        ): null }





            <input type="submit" className='bg-gray-700 !text-white w-full uppercase text-sm font-bold hover:bg-gray-900 py-3 rounded' value="Registrar" />

        </form>

    </div>

      </div>
  </div>
  )
}

export default PageNuevoProducto