import React, { useState } from "react";

const Footer = ({ web3, contract, account, dimensions }) => {
  const [currentPage, setCurrentPage] = useState();
  const style = {
    color: "#ffffff",
    backgroundColor: "#040404",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
    textDecoration: "none",
    fontSize: "20px",
    boxShadow: "0px 5px #000000",
  };

  return (
    <>
      <div
        style={{
          color: "#ffffff",
          backgroundColor: "#040404",
          padding: "0px 5px",
          fontSize: "10px",
          lineHeight: "150%",
        }}
      >
        <div style={{ textAlign: "right" }}>
          Copyright © 2022. Americans Flags NFT 🇺🇸
        </div>
      </div>
    </>
  );
};

export default Footer;
