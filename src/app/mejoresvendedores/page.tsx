"use client"
import React, { useEffect } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';


const TOP_VENDEDORES = gql`
query mejoresVendedores{
  mejoresVendedores{
    vendedor{
      nombre
      email
    }
    total
  }
}
`


const MejoresVendedores  = () => {

    const {data, loading, error, startPolling, stopPolling} = useQuery(TOP_VENDEDORES)

    
    //Cada segundo detectar cambio en la BD
    useEffect(() =>{
        startPolling(1000);
        return ()=>{
            stopPolling()
        }

    }, [startPolling, stopPolling]  )
 
    if(loading) return "Loading..."
    
    console.log(data);
    
    //Arreglo
    //console.log(data.mejoresVendedores);

    const{mejoresVendedores} = data


    const vendedorGrafica:any = []

    mejoresVendedores.map( (vendedor:any, index:any) => {

        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }

    })

    console.log(vendedorGrafica);
    
    
        return (
              
          <div>
            <h1 className='text-2xl text-gray-800 font-light mb-3'>Mejores vendedores</h1>
            
            <ResponsiveContainer width="100%" aspect={2}>
                <BarChart
                className='mt-10'
                width={500}
                height={300}
                data={vendedorGrafica}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
            </ResponsiveContainer>
            </div>
    );

    }

export default MejoresVendedores 