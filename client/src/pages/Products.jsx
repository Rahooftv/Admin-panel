
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export default function Products() {


  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editProduct, setEditProduct] = useState(null)

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/api/products", {withCredentials: true})
    setProducts(res.data)
  }

  const fetchCategories = async ()=>{
    const res = await axios.get("http://localhost:3000/api/categories",{withCredentials: true})
    setCategories(res.data)
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Product Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductForm
          product={editProduct}
          onSave={() => {
            fetchProducts()
            setEditProduct(null)
          }}
          categories={categories}
        />
        <ProductList
          products={products}
          onEdit={(p) => setEditProduct(p)}
          onDelete={fetchProducts}
        />
      </div>
    </div>
  );
}
