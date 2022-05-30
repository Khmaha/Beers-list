import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      Powred by{" "}
      <a
        className="footer-powred"
        href="https://github.com/Khmaha/Beers-list"
        target="_blank"
        rel="noreferrer"
      >
        {" "}
        Maha kharrat
      </a>
    </div>
  );
};

export default Footer;
