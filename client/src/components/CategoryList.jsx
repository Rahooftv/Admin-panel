
import React from "react";

export default function CategoryList({ categories, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-green-700">
          Categories Overview
        </h2>
        <span className="text-sm text-gray-500">
          Total: {categories.length || 0}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-5 text-left font-medium">Category Name</th>
              <th className="py-3 px-5 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((c, i) => (
                <tr
                  key={c._id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-green-50 transition`}
                >
                  <td className="py-3 px-5 border-t">{c.name}</td>
                  <td className="py-3 px-5 border-t text-center space-x-3">
                    <button
                      onClick={() => onEdit(c)}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(c._id)}
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
                  colSpan="2"
                  className="text-center py-6 text-gray-500 italic border-t"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
