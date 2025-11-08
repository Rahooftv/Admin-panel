import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalOrder: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/dashboard", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-green-700">Dashboard Overview</h1>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-medium text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-green-700 mt-2">{stats.totalUsers}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-medium text-gray-600">Total Products</h2>
          <p className="text-3xl font-bold text-green-700 mt-2">{stats.totalProducts}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {stats.totalOrder.reduce((sum, item) => sum + item.totalOrders, 0)}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-medium text-gray-600">Total Revenue</h2>
          <p className="text-3xl font-bold text-green-700 mt-2">
            ${stats.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      
      <div>
        <h2 className="text-2xl font-semibold text-green-700 mb-5">Orders by Category</h2>
        {stats.totalOrder.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.totalOrder.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 text-center"
              >
                <h3 className="text-lg font-medium text-gray-700">{item.category}</h3>
                <p className="text-xl font-semibold text-green-700 mt-3">
                  {item.totalOrders} Orders
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No order data available</p>
        )}
      </div>
    </div>
  );
}
