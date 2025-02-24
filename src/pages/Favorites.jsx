import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useFavorites } from "../utils/hooks/FavoritesContext";
import "./favorites.css";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return <p className="no-favorites">No favorites added yet!</p>;
  }

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorite Countries</h1>
      <div className="favorites-grid">
        {favorites.map((country) => (
          <div key={country.cca3} className="countries-card-container">
            <Link to={`/country/${country.cca3}`} className="countries-card-link">
              <Card className="countries-card">
                <Card.Img
                  variant="top"
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  className="countries-card-flag"
                />
                <Card.Body>
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Text>Region: {country.region}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="danger"
                    className="remove-favorite-btn"
                    onClick={(e) => {
                      e.preventDefault(); 
                      e.stopPropagation();
                      removeFromFavorites(country.cca3); 
                    }}
                  >
                    Remove
                  </Button>
                </Card.Footer>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
