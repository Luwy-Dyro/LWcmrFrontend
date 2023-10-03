"use client";
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useRouter } from 'next/navigation';
import React from 'react'


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



const IndexPage = () => {

  const router = useRouter();

  const { data, loading, client } = useQuery(GET_CLIENT_USUARIO);

  if (loading) {
    return <p>Loading...</p>;
  }

    if (!data.obtenerClientesVendedor) {
      client.clearStore();
      router.push('/login');
      return <p>Loading...</p>;
    }



  

  return (
    <div>Bienvenido</div>
  )

}

export default IndexPage