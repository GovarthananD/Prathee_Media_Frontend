import React from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const CartItem = ({ item, fetchCart }) => {
    const handleUpdate = async (type) => {
        try {
            await API.put("/cart/update", { productId: item.product._id, type });
            fetchCart();
        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    }

    const handleRemove = async () => {
        try {
            await API.delete(`/cart/remove/${item.product._id}`);
            fetchCart();
        } catch (err) {
            toast.error(err.response?.data?.message || "Remove failed");
        }
    }
    return (<>
        <div className="d-flex align-items-center mb-2 border-bottom pb-2">
            <img src={item.product.images[0]} alt="" width="80" className="me-3" />
            <div className="flex-grow-1">
                <h6>{item.product.name}</h6>
                <p>₹{item.product.price}</p>
                <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => handleUpdate("dec")}>-</button>
                    {item.quantity}
                    <button className="btn btn-sm btn-secondary ms-2" onClick={() => handleUpdate("inc")}>+</button>
                </div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={handleRemove}>Remove</button>
        </div>
    </>)
}

export default CartItem;