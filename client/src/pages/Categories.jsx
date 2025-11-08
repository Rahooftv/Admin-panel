
import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories", {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (category) => {
    try {
      if (category._id) {
        await axios.put(
          `http://localhost:3000/api/categories/${category._id}`,
          { name: category.name },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/categories",
          { name: category.name },
          { withCredentials: true }
        );
      }
      setSelectedCategory(null);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving category");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:3000/api/categories/${id}`, {
          withCredentials: true,
        });
        fetchCategories();
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting category");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Category Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryForm
          selectedCategory={selectedCategory}
          onSave={handleSave}
          onCancel={() => setSelectedCategory(null)}
        />
        <CategoryList
          categories={categories}
          onEdit={setSelectedCategory}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
