import React from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Countries from './pages/Countries';
import Favorites from './pages/Favorites'
import { FavoritesProvider } from "./utils/hooks/FavoritesContext"; 
import Country from './pages/Country'

function App() {
  return (
    <FavoritesProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/country/:name" element={<Country />} />
        </Routes>
      </Layout>
    </Router>
    </FavoritesProvider>
  );
}

export default App;
