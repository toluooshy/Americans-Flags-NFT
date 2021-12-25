import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const style = {
    color: "#ffffff",
    backgroundColor: "#040404",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    textDecoration: "none",
    fontSize: "20px",
    boxShadow: "0px 5px #000000",
  };

  return (
    <>
      <div style={{ color: "#ffffff", backgroundColor: "#040404" }}>
        Americans Flags NFT 🇺🇸
      </div>
      <div className="navbar" style={style}>
        <div style={style}>
          <Link to="/">HOME</Link>
        </div>
        <div style={style}>
          <Link to="/mint">MINT</Link>
        </div>
        <div style={style}>
          <Link to="/view">VIEW</Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
