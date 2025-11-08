
import React from "react";
import axios from "axios";

export default function ProductList({ products, onEdit, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`, {
          withCredentials: true,
        });
        onDelete();
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting product");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Product List</h2>
        <span className="text-sm text-gray-500">
          Total: {products.length} items
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-gray-700 text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left font-medium">Name</th>
              <th className="py-3 px-6 text-left font-medium">Category</th>
              <th className="py-3 px-6 text-center font-medium">Price ($)</th>
              <th className="py-3 px-6 text-center font-medium">Status</th>
              <th className="py-3 px-6 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, i) => (
                <tr
                  key={p._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-green-50 transition`}
                >
                  <td className="py-3 px-6 border-t">{p.name}</td>
                  <td className="py-3 px-6 border-t">{p.categoryId?.name}</td>
                  <td className="py-3 px-6 border-t text-center">{p.price}</td>
                  <td
                    className={`py-3 px-6 border-t text-center font-medium ${
                      p.status === "active" ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </td>
                  <td className="py-3 px-6 border-t text-center space-x-3">
                    <button
                      onClick={() => onEdit(p)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic border-t"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
