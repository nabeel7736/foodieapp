import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UsersManagement = () => {

 const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState([]);
  
  
  const [orderedItemCount, setOrderedItemCount] = useState(0);
  const [orders,setOrders] =useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/userDetails/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };
    fetchUser();
  }, [userId]);
   useEffect(() => {
  const fetchOrderedItems = async () => {
    try {
      const res = await axios.get(`http://localhost:3002/orders?userId=${userId}`)
      setOrders(res.data)
      const orders = res.data;

      const count = orders.reduce((total, order) =>
        total + order.items.reduce((sum, item) => sum + item.quantity, 0)
      , 0);

      setOrderedItemCount(count);
    } catch (err) {
      console.error("Failed to fetch order data:", err);
    }
  }

  fetchOrderedItems();
}, [userId]);

  if (!user) return <div className="loading">Loading user details...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center"> User Details</h2>
 <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-6 max-w-xl mx-auto border border-gray-700">
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Role:</strong> {user.role || "User"}</p>
        <p className="mb-2">
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-md text-sm font-semibold ${
              user.status === "active" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {user.status}
          </span>
        </p>
      </div>
      <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-6 max-w-xl mx-auto border border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-yellow-400"> Related Info</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong> Favourite Items:</strong> {user.wishlist?.length || 0}</li>
          <li><strong>Total Dishes Ordered:</strong> {orderedItemCount}</li>
        </ul>
      </div>
<h3 className="text-xl font-semibold mb-3 text-yellow-400">Orders by this User</h3>

      {orders.length === 0 ? (
        <p className="text-gray-300">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between">
                <span><strong>Order #{order.id}</strong> — {order.date}</span>
                <span className="text-sm text-gray-400">Status: <span className="text-yellow-300">{order.status}</span></span>
              </div>
              <p className="mt-2"><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Delivery Address:</strong> {order.address}</p>

              <div className="mt-3">
                <h4 className="font-semibold mb-1">Items:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-300">
                      {item.title} — Qty: {item.quantity} × ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center">
        <button
        type="button"
          onClick={() => navigate("/admin/users")}
          className="px-4 py-2 mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded"
        >
          ← Back to Users
        </button>
      </div>
    </div>
  );
};

export default UsersManagement;
