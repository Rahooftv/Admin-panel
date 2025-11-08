import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseLink =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium";
  const activeLink =
    "bg-green-600 text-white shadow-md";
  const inactiveLink =
    "text-gray-700 hover:bg-green-50 hover:text-green-700";

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/users", label: "Users Management"},
    { path: "/admin/categories", label: "Category Management"},
    { path: "/admin/products", label: "Product Management"},
    { path: "/admin/orders", label: "Order Creation"},
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center gap-2 mb-10">
        
          <h1 className="text-2xl font-semibold text-green-700">Admin Panel</h1>
        </div>

        <nav className="space-y-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Admin Dashboard</p>
      </div>
    </aside>
  );
}
