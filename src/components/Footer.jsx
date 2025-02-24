import React from "react";
import { Container } from "react-bootstrap";
import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <Container>
        <p className="footer-text">
          World Explorer © {currentYear} All Rights Reserved
        </p>
      </Container>
    </div>
  );
}

export default Footer;
