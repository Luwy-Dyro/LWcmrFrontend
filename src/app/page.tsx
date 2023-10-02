
import Users from "@/components/Users";

//FETCH
async function fetchUsers(){
  const res = await fetch("https://reqres.in/api/users")
  const data = await res.json()
  //console.log(data.data);
  return data.data
  
}


export default async function IndexPage() {

  //fetch
  const users = await fetchUsers();
  //onsole.log(users);


return (
    <div>
      <h1 className="text-2xl text-gray-800 font-bold">Home - clients</h1>
      <p>FETCH - REST</p>
      <br />
      <Users users={users}/>
      </div>
  )
}

