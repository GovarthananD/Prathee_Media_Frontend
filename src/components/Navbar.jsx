import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser, logout } from "../utils/auth";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaBoxOpen } from "react-icons/fa";



const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    logout();
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${encodeURIComponent(search)}`);
    setSearch("");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🛍️ E-Shop
        </Link>

        
        <form
          className="d-flex mx-lg-4 my-2 my-lg-0"
          onSubmit={handleSearch}
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <input
            className="form-control me-2 border-dark"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-dark border-dark" type="submit">
            <FaSearch size={18} />
          </button>
        </form>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {user ? (
              <>
                <li className="nav-item me-2 btn btn-outline-primary">
                  Hi, <strong>{user.name}</strong>
                </li>

                <li className="nav-item fw-bold">
                  <Link className="nav-link" to="/cart">
                    <FaShoppingCart size={18} /> Cart
                  </Link>
                </li>

                <li className="nav-item fw-bold">
                  <Link className="nav-link" to="/orders">
                    <FaBoxOpen size={18} /> Orders
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item fw-bold">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item fw-bold">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
