import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DESKTOP_MIN } from "../utils/Constants";

const Header = ({ web3, contract, account, dimensions, setAccount }) => {
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

  const handleConnect = () => {
    async function connectWallet() {
      const accounts = await web3.eth.requestAccounts();
      await setAccount(accounts[0]);
    }
    connectWallet();
  };

  return (
    <>
      <div
        style={{
          color: "#ffffff",
          backgroundColor: "#040404",
          display: dimensions.width >= DESKTOP_MIN ? "flex" : "block",
          padding: "0px 5px",
          justifyContent: "space-between",
          lineHeight: "150%",
        }}
      >
        <div>Americans Flags NFT 🇺🇸</div>
        <div
          style={{ margin: "auto 0px", fontSize: "12px" }}
          onMouseEnter={({ currentTarget }) => {
            if (!account) {
              currentTarget.style.color = "#ffffff";
            }
          }}
          onMouseOut={({ currentTarget }) => {
            if (!account) {
              currentTarget.style.color = "#aaaaaa";
            }
          }}
          onClick={({ currentTarget }) => {
            if (!account) {
              handleConnect();
              currentTarget.style.color = "#0c0";
            } else {
              alert(
                "Wallet already connected. To disconecct simply refresh the webpage."
              );
            }
          }}
        >
          {account || "Connect Web3 Wallet"}
        </div>
      </div>
      <div className="header" style={style}>
        <div>
          <Link to="/">HOME</Link>
        </div>
        <div>
          <Link to="/mint">MINT</Link>
        </div>
        <div>
          <Link to="/view">VIEW</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
