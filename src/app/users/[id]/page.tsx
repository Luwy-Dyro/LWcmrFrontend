// "use client"
// import { useParams } from "next/navigation"

import Image from "next/image";

async function getUser(id:any){
  //console.log("obtenido---", id);
  const res = await fetch(`https://reqres.in/api/users/${id}`)
  const data = await res.json()
  //console.log(data);
  
  return data.data
  
}

async function UsersPage({params}:any) {
    //console.log(params);
     
    const user = await getUser(params.id)
    console.log(user);
    
     /* {JSON.stringify(users)} */
  return (
    <div>
      <h1>Details</h1> 
      <div>
        <Image src={user.avatar} alt={user.first_name} />
        <div>
          <h3>{user.id} {user.first_name} {user.last_name}</h3>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default UsersPage