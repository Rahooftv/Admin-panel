
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserForm({ user, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        await axios.put(
          `http://localhost:3000/api/users/${user._id}`,
          { name, email, phone, password },
          { withCredentials: true }
        );
        alert("User updated successfully");
      } else {
        await axios.post(
          "http://localhost:3000/api/users",
          { name, email, phone, password },
          { withCredentials: true }
        );
        alert("User added successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-96 p-6 space-y-5 relative"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {user ? "Update User" : "Add New User"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={user ? "Leave blank to keep password" : "Create Password"}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!user}
          />
        </div>

        <div className="flex justify-between mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {user ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
