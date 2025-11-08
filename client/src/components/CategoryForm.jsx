
import React, { useState, useEffect } from "react";

export default function CategoryForm({ selectedCategory, onSave, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
    } else {
      setName("");
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ ...selectedCategory, name });
    setName("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-5 border-b pb-2">
        {selectedCategory ? "Edit Category" : "Add New Category"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          required
        />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {selectedCategory ? "Update" : "Add"}
          </button>
          {selectedCategory && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
