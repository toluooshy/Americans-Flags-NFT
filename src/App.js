import "./App.css";
import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import MintPage from "./pages/MintPage";
import ViewPage from "./pages/ViewPage";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Web3 from "web3";
import { address, abi } from "./contracts/AFN_Contract/contract";
import { useWindowDimensions } from "./utils/CustomHooks";
import axios from "axios";
import LoadingObject from "./components/LoadingObject";

const web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(abi, address);

function App() {
  const [wallet, setWallet] = useState();
  const [apisReady, setApisReady] = useState(false);
  const dimensions = useWindowDimensions();

  const connectWallet = async () => {
    async function connectWallet() {
      const accounts = await web3.eth.requestAccounts();
      await setWallet(accounts[0]);
    }
    connectWallet();
  };

  useEffect(async () => {
    await axios
      .get(`https://image-grabber-api.herokuapp.com`)
      .then(async (response) => {
        const grabberApiRunning =
          response.data["Root Request"] === 200 ? true : false;
        await axios
          .get(`https://flag-generator-api.herokuapp.com`)
          .then(async (response) => {
            const generatorApiRunning =
              response.data["Root Request"] === 200 ? true : false;

            setApisReady(grabberApiRunning && generatorApiRunning);
          });
      });
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
      {!!apisReady ? (
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
        <div>
          <br />
          <LoadingObject />
        </div>
      )}
      <Footer contract={contract} wallet={wallet} dimensions={dimensions} />
    </div>
  );
}

export default App;
