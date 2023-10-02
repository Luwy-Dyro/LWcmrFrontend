"use client";
import React from 'react'

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";


//GRAPH QL
const query = gql`query {
 characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
}`;


function AboutPage() {

        
  //GRAPH QL
  const { data }:any = useSuspenseQuery(query);
  console.log(data);
  
  
  return (
    <div>
        <h1 className="text-xl">About</h1>
        <p  className="text-[#9e3d3d]">GRAPH QL</p>


           <p>{data.characters.info.count}</p>


        </div>
  )
}

export default AboutPage