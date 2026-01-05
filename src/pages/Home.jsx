import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faMobileAlt, faLaptop, faHome, faTshirt, faPlug,faBorderAll,faCookieBite } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const category = searchParams.get("category"); // 👈 Get category from URL
  const navigate = useNavigate();

  // Category options
  const categories = [
    {
      id: 1,
      name: "Fashion",  
      value: "fashion",
      icon: faShirt,
      color: "#ff6b6b",
      description: "Clothing & Accessories"
    },
    {
      id: 2,
      name: "Electronics",
      value: "electronics",
      icon: faMobileAlt,
      color: "#4ecdc4",
      description: "Phones & Gadgets"
    }, {
      id: 3,
      name: "Laptops",
      value: "laptops",
      icon: faLaptop,
      color: "#45b7d1",
      description: "Computers & Laptops"
    },
    {
      id: 4,
      name: "Home Appliances",
      value: "home-appliances",
      icon: faHome,
      color: "#96ceb4",
      description: "Home & Kitchen"
    },
    {
      id:5,
      name:"Grocery",
      value: "grocery",
      icon:faCookieBite,
      color:"#feca57",
      description:"Food & Essentials"
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        // Build query params
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;

        const res = await API.get("/products", { params });
        setProducts(res.data);

        // Update selected category state
        if (category) {
          setSelectedCategory(category);
        } else {
          setSelectedCategory("");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category]); // 👈 Add category to dependency array

  // Handle category click
  const handleCategoryClick = (catValue) => {
    if (catValue === selectedCategory) {
      // If same category clicked again, clear it
      setSelectedCategory("");
      navigate("/");
    } else {
      // Set new category
      setSelectedCategory(catValue);
      navigate(`/?category=${catValue}`);
    }
  };

  // Handle clear all filters
  const handleClearFilters = () => {
    setSelectedCategory("");
    navigate("/");
  };

  return (
    <div className="container my-4">
      {/* Category Icons Section */}
      <div className="mb-5">
        <p className="mb-4 text-center fs-1 fw-bold">Browse By Categories</p>
        <div className="row g-2">
          {/* All Products Card */}
          <div className="col-3 col-sm-2 col-md-3 col-lg">
            <div
              className={`category-card card h-100 text-center border-0 product-card ${selectedCategory === "" ? "selected border-primary" : "border-light"}`}
              onClick={handleClearFilters}
              style={{
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderWidth: "2px",
                borderStyle: "solid"
              }}
            >
              <div className="card-body p-2 p-md-3 border-1">
                <div className="mb-2">
                  <div
                    className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: selectedCategory === "" ? "#0d6efd" : "#f8f9fa",
                      color: selectedCategory === "" ? "white" : "#6c757d",
                      fontSize: "0.9rem"
                    }}
                  >
                    <FontAwesomeIcon icon={faBorderAll} />
                  </div>
                </div>
                <h6 className="card-title mb-0" style={{ fontSize: "0.8rem" }}>All</h6>
                <small className="text-muted d-none d-md-block" style={{ fontSize: "0.7rem" }}>Products</small>
              </div>
            </div>
          </div>

          {/* Category Cards */}
          {categories.map((cat) => (
            <div className="col-3 col-sm-2 col-md-3 col-lg" key={cat.id}>
              <div
                className={`category-card card h-100 text-center border-0 product-card ${selectedCategory === cat.value ? "selected" : "border-light"}`}
                onClick={() => handleCategoryClick(cat.value)}
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: selectedCategory === cat.value ? cat.color : "transparent"
                }}
              >
                <div className="card-body p-2 p-md-3">
                  <div className="mb-2">
                    <div
                      className="mx-auto rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: selectedCategory === cat.value ? `${cat.color}15` : "#f8f9fa",
                        color: selectedCategory === cat.value ? cat.color : "#6c757d",
                        fontSize: "0.9rem"
                      }}
                    >
                      <FontAwesomeIcon icon={cat.icon} />
                    </div>
                  </div>
                  <h6 className="card-title mb-0" style={{ fontSize: "0.8rem" }}>{cat.name}</h6>
                  <small className="text-muted d-none d-md-block" style={{ fontSize: "0.7rem" }}>
                    {cat.description.split(' ')[0]}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Filter Display */}
      {(search || selectedCategory) && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-2">
                {selectedCategory ? categories.find(c => c.value === selectedCategory)?.name : "All Products"}
                {search && (
                  <span className="text-muted fs-5 ms-2">for "{search}"</span>
                )}
              </h3>
              <p className="text-muted mb-0">
                {products.length} {products.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            {(search || selectedCategory) && (
              <button
                className="btn btn-outline-secondary"
                onClick={handleClearFilters}
              >
                <FontAwesomeIcon icon={faPlug} className="me-1" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* No Filters Header */}
      {!search && !selectedCategory && (
        <div className="mb-4">
          <h3>All Products</h3>
          <p className="text-muted">{products.length} products available</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
          <p className="mt-3">Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="row g-4">
          {products.length === 0 ? (
            <div className="text-center my-5 py-5">
              <div className="mb-4">
                <FontAwesomeIcon
                  icon={selectedCategory ? categories.find(c => c.value === selectedCategory)?.icon : faTshirt}
                  size="4x"
                  className="text-muted mb-3"
                />
              </div>
              <h4>No Products Found</h4>
              {search && (
                <p className="text-muted">No results for "<strong>{search}</strong>"</p>
              )}
              {selectedCategory && (
                <p className="text-muted">
                  No products in <strong>{categories.find(c => c.value === selectedCategory)?.name}</strong> category yet
                </p>
              )}
              <button className="btn btn-primary mt-3" onClick={handleClearFilters}>
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Browse All Products
              </button>
            </div>
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