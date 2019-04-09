import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ location, managers }) => {
  const pathname = location.pathname;
  const links = ["/api/home", "/api/products", "/api/managers"];

  return (
    <nav className="nav">
      <a className="navBar-brand mb-0 h1">ACME</a>

      <ul className="nav">
        {links.map(link => (
          <li className="nav-item" key={link}>
            <Link
              to={link}
              className={`nav-link${link === pathname ? " active" : ""}`}
            >
              {link === "/api/managers" ? (
                <span className="badge badge-pill badge-light">
                  {managers.length}
                </span>
              ) : (
                ""
              )}
              {link.slice(5)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
