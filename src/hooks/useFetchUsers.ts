import { useEffect, useState } from "react";
import { api } from "../api";
import { USERS_API_URL } from "../constants";

interface User {
    id:number;
    name:string;
    email:string
}

export const useFetchUsers =()=>{
   const [users,setUsers]=useState<User[]>([]);
   const [loading,setLoading]=useState<boolean>(true);
   const [error, setError] = useState<string>("");

   useEffect(()=>{
    const fetchUsers =async()=>{
        try {
            const response=await api.get(USERS_API_URL);
            setUsers(response.data);
        } catch (err) {
            setError("Failed to fetch users");
        }finally{
            setLoading(false);
        }

    };

    fetchUsers();
   },[])

    return(
        {users,loading,error}
    )
}