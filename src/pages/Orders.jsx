import React, { useEffect, useState } from "react";
import API from "../api/axios"
import toast from "react-hot-toast";
import { getUser } from "../utils/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!getUser()) return;
    API.post("/orders/place")
      .then(res => setOrders(res.data.orders || []))
      .catch(err => toast.error(err.response?.data?.message));
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Order History</h2>

      {orders.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <p className="text-center display-6 text-muted">No orders found</p>
          <img className="img-fluid" src="https://cdn-icons-png.flaticon.com/128/9982/9982281.png" alt="img" />
        </div>
      ) : (
        orders.map(order => (
          <div className="card mb-3 shadow-sm" key={order._id}>
            <div className="card-body">
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p>
                <strong>Address:</strong> {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}
              </p>
              <p>{order.aiSummary}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
