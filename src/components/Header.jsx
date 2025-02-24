import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

 
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

 
  useEffect(() => {
    document.body.className = theme; 
  }, [theme]);

  return (
    <div className="header">
      <nav>
        <Container className="header-container">
          <h1 className="title">World Explorer</h1>

          <ul className="navigation">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/countries">Countries</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>

          {/* Butonul de schimbare a temei */}
          <Button className="theme-btn" variant="outline-primary" onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </Container>
      </nav>
    </div>
  );
}

export default Header;
