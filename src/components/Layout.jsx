import React from "react";
import "./layout.css";
import Header from './Header'
import Footer from "./Footer";

function Layout({ children }) {
    return (
      <div className="layout">
        <Header />
        <main className="content">{children}</main>
        <Footer />
      </div>
    );
  }
  
  export default Layout;