import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../utils/hooks/useFetch";
import { endpoints } from "../api/endpoint";
import { useFavorites } from "../utils/hooks/FavoritesContext";
import "./country.css";

const Country = () => {
  const { name } = useParams();
  const { data, loading, error } = useFetch(endpoints.countryByCode(name));
  const { data: allCountries } = useFetch(endpoints.allCountries);
  const { addToFavorites } = useFavorites();
  const [recommendedCountries, setRecommendedCountries] = useState([]);

  useEffect(() => {
    if (data && allCountries) {
      const country = data[0];
      if (country && country.region) {
        const filteredCountries = allCountries
          .filter((c) => c.region === country.region && c.cca3 !== country.cca3)
          .slice(0, 4);
        setRecommendedCountries(filteredCountries);
      }
    }
  }, [data, allCountries]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  const country = data[0];

  return (
    <div className="country-container">
      <h1>{country.name.common}</h1>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        className="country-flag"
      />

      <div className="country-info">
        <p>
          <strong>Capital:</strong> {country.capital?.[0]}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Subregion:</strong> {country.subregion}
        </p>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Area:</strong> {country.area.toLocaleString()} km²
        </p>
        <p>
          <strong>Independence:</strong> {country.independent ? "Yes" : "No"}
        </p>
        <p>
          <strong>Languages:</strong>{" "}
          {country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A"}
        </p>
        <p>
          <strong>Currency:</strong>{" "}
          {country.currencies
            ? Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(", ")
            : "N/A"}
        </p>
        <p>
          <strong>Time zone:</strong>{" "}
          {country.timezones ? country.timezones.join(", ") : "N/A"}
        </p>
      </div>

      <button
        className="add-to-favorites-btn"
        onClick={() => addToFavorites(country)}
      >
        Add to Favorites
      </button>

      <div className="recommended-container">
        <h2>Other countries in {country.region}</h2>
        <div className="recommended-grid">
          {recommendedCountries.map((recCountry) => (
            <Link
              key={recCountry.cca3}
              to={`/country/${recCountry.cca3}`}
              className="recommended-card"
            >
              <img
                src={recCountry.flags.png}
                alt={`Flag of ${recCountry.name.common}`}
              />
              <p>{recCountry.name.common}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Country;
