import React, { useState, useEffect } from "react";
import useFetch from "../utils/hooks/useFetch";
import { endpoints } from "../api/endpoint";
import { Link } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useFavorites } from "../utils/hooks/FavoritesContext";
import "./countries.css";

const Countries = () => {
  const { data, loading, error } = useFetch(endpoints.allCountries);
  const [showTopButton, setShowTopButton] = useState(false);
  const { addToFavorites } = useFavorites();
  const [selectedRegion, setSelectedRegion] = useState("All");
  const countryList = Array.isArray(data) ? data : [];

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 1000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCountries = selectedRegion === "All"
    ? countryList
    : countryList.filter(country => country.region === selectedRegion);

  const uniqueRegions = ["All", ...new Set(countryList.map(country => country.region))];

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!filteredCountries.length) return <p>No countries found.</p>;

  return (
    <div className="countries-container">
      <h1 className="countries-title">Country List</h1>

      <Form.Select
        className="region-filter"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        {uniqueRegions.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </Form.Select>

      <div className="countries-grid">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="countries-card-container">
            <Link to={`/country/${country.cca3}`} className="countries-card-link">
              <Card className="countries-card">
                <Card.Img
                  variant="top"
                  src={country.flags?.png || "https://via.placeholder.com/150"}
                  alt={`Flag of ${country.name?.common || "Unknown"}`}
                  className="countries-card-flag"
                />
                <Card.Body>
                  <Card.Title>{country.name?.common || "No Name"}</Card.Title>
                  <Card.Text>Region: {country.region || "Unknown"}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="success"
                    className="add-to-favorites-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addToFavorites(country);
                    }}
                  >
                    Add to Favorites
                  </Button>
                </Card.Footer>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      <button
        className={`back-to-top ${showTopButton ? "show" : ""}`}
        onClick={handleBackToTop}
      >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </div>
  );
};

export default Countries;
