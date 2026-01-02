import React from "react";
import API from "../api/axios";
import { getUser } from "../utils/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!getUser()) {
      return toast.error("Please login to add products to cart");
    }

    try {
      await API.post("/cart/add", { productId: product._id });
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add");
    }
  };

  return (
    <div className="card h-100 shadow-lg cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}>
      <div className="ratio ratio-4x3">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-100 h-100"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.brand}</p>
        <p className="card-text fw-bold">₹{product.price}</p>

        <button
          onClick={handleAddToCart}
          className="btn btn-primary mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
