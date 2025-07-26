import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [pref, setPref] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            MERN
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/all" className="nav-link">
                  All Post
                </Link>
              </li>
            </ul>
          </div>
          {location.pathname === "/all" && (
            <form
              className="d-flex"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search?q=${pref}`);
                setPref("");
              }}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                onChange={(e) => {
                  setPref(e.target.value);
                }}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
