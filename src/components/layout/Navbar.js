import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../img/logo.svg";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="nav_link_container">
        <Link to="/search-bug" className="nav_link">
          Search Bug Report
        </Link>
        <Link to="/add-bug-report" className="nav_link">
          Add Bug Report
        </Link>
      </div>
    </nav>
  );
}
