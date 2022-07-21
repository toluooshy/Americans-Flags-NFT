import "./App.css";
import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import MintPage from "./pages/MintPage";
import ViewPage from "./pages/ViewPage";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Web3 from "web3";
import { ContractABI } from "./contracts/AFN_Contract/AFN_Contract_abi";
import { useWindowDimensions } from "./utils/CustomHooks";
import axios from "axios";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0xa91F47d0681657c02dCee9D0328152893968000B";
const contract = new web3.eth.Contract(ContractABI, contractAddress);

function App() {
  const [account, setAccount] = useState();
  const [apisReady, setApisReady] = useState(false);
  const dimensions = useWindowDimensions();

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
        account={account}
        dimensions={dimensions}
        setAccount={setAccount}
      />
      {!!apisReady ? (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                contract={contract}
                account={account}
                dimensions={dimensions}
              />
            }
          />
          <Route
            path="/mint"
            element={
              <MintPage
                contract={contract}
                account={account}
                dimensions={dimensions}
              />
            }
          />
          <Route
            path="/view"
            element={
              <ViewPage
                contract={contract}
                account={account}
                dimensions={dimensions}
              />
            }
          />
        </Routes>
      ) : (
        <h1>LOADING...</h1>
      )}
      <Footer contract={contract} account={account} dimensions={dimensions} />
    </div>
  );
}

export default App;
