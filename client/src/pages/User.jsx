
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUsers = async () =>{
    try {
      const res = await axios.get("http://localhost:3000/api/users",{withCredentials:true,})
      setUsers(res.data)
      setLoading(false)
    }catch(err){
      alert(err.response?.data?.message ||"Failed to fetch users")
    }
  }


  useEffect(()=>{
    fetchUsers()
  },[])

  const handleEdit = (user)=>{
    setSelectedUser(user)
    setShowForm(true)
  }

  const handleAdd = ()=>{
    setSelectedUser(null)
    setShowForm(true)
  };

  const deleteUser = async(id)=>{
    if(!window.confirm("you want to delete this user?")) return
    try{
    await axios.delete(`http://localhost:3000/api/users/${id}`, {withCredentials: true})

      alert("user deleted successfully")
      setUsers(users.filter((u) => u._id !== id))
    }catch (err){
      alert(err.response?.data?.message || "Delete failed")
    }
  }

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Users Management</h1>
        <button  onClick={handleAdd} className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition" >Add User</button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-green-100 text-gray-700">
            <tr>
              <th className="py-3 px-5 text-left">Name</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">Phone</th>
              <th className="py-3 px-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-5">{u.name}</td>
                <td className="py-3 px-5">{u.email}</td>
                <td className="py-3 px-5">{u.phone}</td>
                <td className="py-3 px-5 text-center space-x-2">
                  <button  onClick={() => handleEdit(u)} className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" > Edi </button>

                  <button onClick={() => deleteUser(u._id)} className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" >Delete </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <UserForm
          user={selectedUser}
          onClose={() => setShowForm(false)}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
}
