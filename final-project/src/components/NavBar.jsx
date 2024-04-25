import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { LuSearch } from "react-icons/lu";
import { LuCoffee } from "react-icons/lu";

const NavBar = ({ onSearch, searchQuery }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <LuCoffee className="coffee-logo" />
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/create">Create Post</Link>
        </li>
        <li className="navbar-item">
          <div className="search-input-wrapper">
            <LuSearch className="search-icon" />
            <input
              className="search-input"
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search posts..."
            />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
