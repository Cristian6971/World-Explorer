import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./home.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../utils/hooks/useFetch";
import { endpoints } from "../api/endpoint";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const cleanedSearchTerm = searchTerm.trim().toLowerCase();

  const { data, loading } = useFetch(
    isSubmitted && cleanedSearchTerm
      ? endpoints.countryByName(cleanedSearchTerm)
      : null
  );

  useEffect(() => {
    if (data && isSubmitted) {
      const exactMatch = data.find(
        (country) => country.name.common.toLowerCase() === cleanedSearchTerm
      );

      if (exactMatch) {
        const countryCode = exactMatch.cca3;
        navigate(`/country/${countryCode}`);
      } else {
        console.error("Exact match not found in the results.");
        alert(
          "No exact match found for the entered country name. Please refine your search."
        );
      }
    }
  }, [data, isSubmitted, navigate, cleanedSearchTerm]);

  return (
    <div className="home">
      <Container>
        <label htmlFor="search-input" className="search-label">
          You can search your country here:
        </label>
        <input
          type="text"
          className="search-input"
          name="search-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>

        {loading && <p>Loading...</p>}
      </Container>
    </div>
  );
}

export default Home;
