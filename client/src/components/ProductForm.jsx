
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ product, onSave, categories }) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [status, setStatus] = useState(product?.status || "active");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = { name, price, categoryId, status };
      if (product?._id) {
        await axios.put(
          `http://localhost:3000/api/products/${product._id}`,
          productData,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:3000/api/products", productData, {
          withCredentials: true,
        });
      }
      onSave();
      setName("");
      setPrice("");
      setCategoryId("");
      setStatus("active");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-5 border-b pb-2">
        {product ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          required
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition"
        >
          {product ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
