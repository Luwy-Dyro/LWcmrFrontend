"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Users({users}:any) {

  const router = useRouter()

  return (
    <ul>
    {
      users.map((user:any) => (
        <li key={user.id}
          onClick={() =>{
            //console.log(user.id);
            router.push(`/users/${user.id}`)
            
          }}
        
        >
          <div>
            <h5>{user.id} {user.first_name} {user.last_name}</h5>
            <p>{user.email}</p>
    
          </div>

          <Image src={user.avatar} alt={user.email} />
          
        </li>
      ) )
    }
    </ul>
  )
}

export default Users