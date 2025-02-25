import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    try {
      const parsed = JSON.parse(storedFavorites);
      // Dacă parsed nu este un array, returnează un array gol
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      // Dacă există eroare la parsare sau nu există, returnează un array gol
      return [];
    }
  });

  // Salvează favoritele în localStorage de fiecare dată când se modifică
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (country) => {
    if (!favorites.some((fav) => fav.cca3 === country.cca3)) {
      setFavorites((prevFavorites) => [...prevFavorites, country]);
    }
  };

  const removeFromFavorites = (cca3) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((country) => country.cca3 !== cca3)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
