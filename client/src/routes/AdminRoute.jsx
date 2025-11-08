
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() =>{
    const checkAdmin = async () =>{
      try{
        const res = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true,})
        setIsAdmin(res.data.user.isAdmin)
      }catch(err){
        setIsAdmin(false)
      }finally{
        setLoading(false)
      }
    }

    checkAdmin()
  }, [])

  if(loading) return <div>Loading...</div>
  return isAdmin ? children : <Navigate to="/login" replace />
}
