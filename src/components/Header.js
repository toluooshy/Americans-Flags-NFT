import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import { DESKTOP_MIN } from "../utils/Constants";

const Header = ({ web3, contract, wallet, dimensions, connectWallet }) => {
  const location = useLocation();
  return (
    <div style={{ backgroundColor: "#000000" }}>
      <div
        style={{
          display: "flex",
          padding: "50px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            padding: "0px 5px",
            textAlign: "left",
          }}
        >
          <div style={{ fontSize: "25px" }}>Americans Flags NFT</div>
          <div
            style={{
              margin: "10px 0px",
              fontSize: "12px",
            }}
            onMouseEnter={({ currentTarget }) => {
              if (!wallet) {
                currentTarget.style.color = "#ffffff";
              }
            }}
            onMouseOut={({ currentTarget }) => {
              if (!wallet) {
                currentTarget.style.color = "#aaaaaa";
              }
            }}
            onClick={({ currentTarget }) => {
              if (!wallet) {
                connectWallet();
                currentTarget.style.color = "#0c0";
              } else {
                alert(
                  "Wallet already connected. To disconecct simply refresh the webpage."
                );
              }
            }}
          >
            {wallet || "Connect Web3 Wallet"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "175px",
          }}
        >
          <Link
            to="/"
            style={{
              color: location.pathname.length < 2 ? "#ffffff" : "#cccccc",
              textDecoration:
                location.pathname.length < 2 ? "underline" : "none",
            }}
          >
            Home
          </Link>
          <Link
            to="/mint"
            style={{
              color:
                location.pathname.indexOf("mint") !== -1
                  ? "#ffffff"
                  : "#cccccc",
              textDecoration:
                location.pathname.indexOf("mint") !== -1 ? "underline" : "none",
            }}
          >
            Mint
          </Link>

          <Link
            to="/view"
            style={{
              color:
                location.pathname.indexOf("view") !== -1
                  ? "#ffffff"
                  : "#cccccc",
              textDecoration:
                location.pathname.indexOf("view") !== -1 ? "underline" : "none",
            }}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
