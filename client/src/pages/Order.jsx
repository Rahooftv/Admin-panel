import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrderCreation() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([{ productId: "", quantity: 1, price: 0 }]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users", { withCredentials: true, })
        setUsers(res.data)
      } catch {
        alert("Failed to fetch users")
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products", {
          withCredentials: true,
        });
        setProducts(res.data);
      } catch {
        alert("Failed to fetch products");
      }
    };

    fetchUsers();
    fetchProducts();
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] =
      field === "quantity" || field === "price" ? Number(value) : value
    if (field === "productId") {
      const product = products.find((p) => p._id === value)
      if (product) newItems[index].price = product.price
    }
    setItems(newItems);
  };

  const addItem = () =>
    setItems([...items, { productId: "", quantity: 1, price: 0 }])

  const removeItem = (index) =>
    setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!userId) return alert("Please select a user");
      const res = await axios.post(
        "http://localhost:3000/api/orders",
        { userId, items },
        { withCredentials: true }
      );
      alert(res.data.message);
      setItems([{ productId: "", quantity: 1, price: 0 }]);
      setUserId("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create order")
    }
  }

  const totalPrice = items.reduce((sum,item)=>sum + item.price * item.quantity,0 )

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h2 className="text-3xl font-semibold text-green-700 text-center mb-8">
          Create New Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Select User
            </label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              required
            >
              <option value="">-- Select a User --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

    
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Order Items
            </label>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center bg-gray-50 border border-gray-200 p-4 rounded-lg"
                >
                  <select
                    value={item.productId}
                    onChange={(e) =>
                      handleItemChange(index, "productId", e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition sm:col-span-2"
                    required
                  >
                    <option value="">-- Select Product --</option>
                    {products.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} (${p.price})
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    className="p-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                  />

                  <input
                    type="number"
                    readOnly
                    value={(item.price * item.quantity).toFixed(2)}
                    className="p-2 border border-gray-200 rounded-md bg-gray-100 text-center"
                    placeholder="Price"
                  />

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-600 font-medium hover:text-red-700 transition sm:col-span-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={addItem}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                + Add Another Product
              </button>
            </div>
          </div>

         
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between text-lg font-medium text-gray-700">
              <span>Total Price:</span>
              <span className="text-green-700 font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

 
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-md text-lg font-medium hover:bg-green-700 transition mt-6"
          >
            Confirm and Create Order
          </button>
        </form>
      </div>
    </div>
  );
}
