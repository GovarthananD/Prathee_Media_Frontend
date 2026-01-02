import React, { useEffect, useState } from "react";
import API from "../api/axios"
import CartItem from "../components/CartItem";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getUser()) {
      toast.error("Login required to view cart");
      navigate("/login");
    } else {
      fetchCart();
    }
  }, []);

  const handlePlaceOrder = async () => {
    try {
      setOrderLoading(true);
      await API.post("/orders/place", { address });
      toast.success("Order placed successfully!");
      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2>My Cart</h2>

      {/* Loader */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* Cart Content */}
      {!loading && !error && (
        <>
          {cart?.items?.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
              <p className="text-center h4">Your cart is empty</p>
              <img className="" src="https://cdn-icons-png.flaticon.com/128/13637/13637462.png" alt="img" />
            </div>
          ) : (
            <>
              {cart?.items?.map(item => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  fetchCart={fetchCart}
                />
              ))}

              <h4 className="mt-4">Delivery Address</h4>
              <div className="row">
                {[
                  "fullName",
                  "phone",
                  "addressLine",
                  "city",
                  "state",
                  "pincode"
                ].map(field => (
                  <div className="col-md-4 mb-2" key={field}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={field}
                      value={address[field]}
                      onChange={e =>
                        setAddress({ ...address, [field]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                className="btn btn-success mt-3"
                onClick={handlePlaceOrder}
                disabled={orderLoading}
              >
                {orderLoading ? "Placing Order..." : "Place Order"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
