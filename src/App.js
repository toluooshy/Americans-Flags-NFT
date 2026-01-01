import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MintPage from "./pages/MintPage";
import ViewPage from "./pages/ViewPage";
import LoadingObject from "./components/LoadingObject";

import { address, abi } from "./contracts/AFN_Contract/contract";
import { useWindowDimensions } from "./utils/CustomHooks";

function App() {
  const [wallet, setWallet] = useState(null);
  const [apisReady, setApisReady] = useState(false);
  const dimensions = useWindowDimensions();

  // Create web3 + contract only once
  const web3 = useMemo(() => {
    if (window.ethereum) {
      return new Web3(window.ethereum);
    }
    return null;
  }, []);

  const contract = useMemo(() => {
    if (!web3) return null;
    return new web3.eth.Contract(abi, address);
  }, [web3]);

  // Wallet connection
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWallet(accounts[0]);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  // Check external APIs
  useEffect(() => {
    const checkApis = async () => {
      try {
        const [grabber, generator] = await Promise.all([
          axios.get("https://image-grabber-api.herokuapp.com"),
          axios.get("https://flag-generator-api.herokuapp.com"),
        ]);

        setApisReady(
          grabber.data["Root Request"] === 200 &&
            generator.data["Root Request"] === 200
        );
      } catch (err) {
        console.error("API check failed:", err);
        setApisReady(false);
      }
    };

    checkApis();
  }, []);

  return (
    <div className="App">
      <Header
        web3={web3}
        contract={contract}
        wallet={wallet}
        dimensions={dimensions}
        setWallet={setWallet}
        connectWallet={connectWallet}
      />

      {apisReady ? (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                contract={contract}
                wallet={wallet}
                dimensions={dimensions}
              />
            }
          />
          <Route
            path="/mint"
            element={
              <MintPage
                contract={contract}
                wallet={wallet}
                dimensions={dimensions}
              />
            }
          />
          <Route
            path="/view"
            element={
              <ViewPage
                contract={contract}
                wallet={wallet}
                dimensions={dimensions}
              />
            }
          />
        </Routes>
      ) : (
        <div
          style={{
            backgroundColor: "#000000",
            minHeight: `${dimensions.height + 100}px`,
          }}
        >
          <LoadingObject />
        </div>
      )}
    </div>
  );
}

export default App;
