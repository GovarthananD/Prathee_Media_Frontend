import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search"); // 👈 read from URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get("/products", {
          params: { search } 
        });

        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <div className="container my-4">
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border"></div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row g-3">
          {products.length === 0 ? (
            <p className="text-center">No Products Found</p>
          ) : (
            products.map(product => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
