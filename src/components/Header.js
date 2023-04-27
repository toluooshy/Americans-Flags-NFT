import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import { DESKTOP_MIN } from "../utils/Constants";
import line from "../images/line.png";
import cross from "../images/cross.png";

const Header = ({ web3, contract, wallet, dimensions, connectWallet }) => {
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div style={{ backgroundColor: "#000000" }}>
      <div
        style={{
          display: "flex",
          padding: dimensions.width > DESKTOP_MIN ? "50px" : "20px",
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
        {dimensions.width > DESKTOP_MIN ? (
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
                  location.pathname.indexOf("mint") !== -1
                    ? "underline"
                    : "none",
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
                  location.pathname.indexOf("view") !== -1
                    ? "underline"
                    : "none",
              }}
            >
              View
            </Link>
          </div>
        ) : (
          <div
            style={{ color: "#ffffff", padding: "10px" }}
            onClick={() => {
              setDropdownVisible(true);
            }}
          >
            <img
              src={line}
              style={{
                filter: "invert(1)",
                opacity: "50%",
                width: "30px",
                height: "36px",
                marginTop: "-10px",
                marginRight: "-5px",
              }}
            />
          </div>
        )}
        {dropdownVisible && (
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
              backgroundColor: "#000000",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  color: "#ffffff",
                  padding: "20px 25px",
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
              <img
                src={cross}
                style={{
                  filter: "invert(1)",
                  padding: "20px",
                  opacity: "50%",
                  width: "36px",
                  height: "36px",
                }}
                onClick={() => {
                  setDropdownVisible(false);
                }}
              />
            </div>
            <div style={{ margin: "200px 0px", fontSize: "48px" }}>
              <Link
                to="/"
                style={{
                  color: location.pathname.length < 2 ? "#ffffff" : "#cccccc",
                  textDecoration:
                    location.pathname.length < 2 ? "underline" : "none",
                }}
                onClick={() => {
                  setDropdownVisible(false);
                }}
              >
                Home
              </Link>
              <br />
              <br />
              <Link
                to="/mint"
                style={{
                  color:
                    location.pathname.indexOf("mint") !== -1
                      ? "#ffffff"
                      : "#cccccc",
                  textDecoration:
                    location.pathname.indexOf("mint") !== -1
                      ? "underline"
                      : "none",
                }}
                onClick={() => {
                  setDropdownVisible(false);
                }}
              >
                Mint
              </Link>
              <br />
              <br />
              <Link
                to="/view"
                style={{
                  color:
                    location.pathname.indexOf("view") !== -1
                      ? "#ffffff"
                      : "#cccccc",
                  textDecoration:
                    location.pathname.indexOf("view") !== -1
                      ? "underline"
                      : "none",
                }}
                onClick={() => {
                  setDropdownVisible(false);
                }}
              >
                View
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
