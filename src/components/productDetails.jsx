import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                toast.error("Failed to load product");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center my-5">Loading...</div>;
    if (!product)
        return <h4 className="text-center my-5">Product not found</h4>;

    return (
        <div className="container mt-5">
            <div className="row g-4">
                <div className="col-md-6">
                    <img
                        src={product.images?.[0]}
                        className="img-fluid rounded"
                        alt={product.name}
                    />
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p className="text-muted">{product.brand}</p>
                    <h4 className="text-success">₹{product.price}</h4>
                    <p className="mt-3">{product.description}</p>
                    <p className="mt-3">Rating {product.rating}</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={async () => {
                            const user = JSON.parse(localStorage.getItem("user"));
                            if (!user) return toast.error("Please login to add products to cart");

                            try {
                                await API.post("/cart/add", { productId: product._id });
                                toast.success("Added to cart");
                            } catch (err) {
                                console.error(err);
                                toast.error(err.response?.data?.message || "Failed to add to cart");
                            }
                        }}
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
