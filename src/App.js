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

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x91e58233Acb657F7702E5f4498d94c3422020900";
const contract = new web3.eth.Contract(ContractABI, contractAddress);

function App() {
  const [account, setAccount] = useState();
  const dimensions = useWindowDimensions();

  useEffect(() => {}, []);

  return (
    <div className="App">
      <Header
        web3={web3}
        contract={contract}
        account={account}
        dimensions={dimensions}
        setAccount={setAccount}
      />
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
      <Footer contract={contract} account={account} dimensions={dimensions} />
    </div>
  );
}

export default App;
