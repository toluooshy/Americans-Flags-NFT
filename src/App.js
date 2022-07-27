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
import LoadingObject from "./components/LoadingObject";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0xDC0D2728D9f836Cb89F95E9CE7F5f01a021F8b1E";
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
        <LoadingObject />
      )}
      <Footer contract={contract} account={account} dimensions={dimensions} />
    </div>
  );
}

export default App;
