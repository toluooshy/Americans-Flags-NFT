"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateFlagForm from "../components/UpdateFlagForm";
import TransferFlagForm from "../components/TransferFlagForm";
import LoadingObject from "../components/LoadingObject";
import { DESKTOP_MIN } from "../utils/Constants";

const ViewPage = ({ contract, account, dimensions }) => {
  const [userTokens, setUserTokens] = useState([]);
  const [globalTokens, setGlobalTokens] = useState([]);
  const [tokensList, setTokensList] = useState(userTokens);
  const [isLoading, setIsLoading] = useState(false);

  const containerstyle = {
    width: "95%",
    margin: "auto",
  };

  useEffect(() => {
    !!account && getUserTokens();
  }, []);

  const getUserTokens = async () => {
    setIsLoading(true);
    setUserTokens([]);
    await contract.methods.walletOfOwner(account).call(async (err, res) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      const userTokenIndexes = res.map((i) => Number(i));
      for (let i = 0; i < userTokenIndexes.length; i++) {
        await contract.methods
          .flags(userTokenIndexes[i])
          .call(async (err, res) => {
            if (err) {
              console.log("An error occured", err);
              return;
            }
            await axios
              .get(res.URI)
              .then(async (response) => {
                await contract.methods
                  .ownerOf(userTokenIndexes[i])
                  .call(async (err, res) => {
                    if (err) {
                      console.log("An error occured", err);
                      return;
                    }
                    setUserTokens((prevUserTokens) => [
                      ...prevUserTokens,
                      [res, response.data],
                    ]);
                  });
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }
    });
    setTokensList(userTokens);
    setIsLoading(false);
  };

  const getGlobalTokens = async () => {
    setIsLoading(true);
    setGlobalTokens([]);
    await contract.methods.totalSupply().call(async (err, res) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      for (let i = 1; i <= res; i++) {
        await contract.methods.flags(i).call(async (err, res) => {
          if (err) {
            console.log("An error occured", err);
            return;
          }
          await axios
            .get(res.URI)
            .then(async (response) => {
              await contract.methods.ownerOf(i).call(async (err, res) => {
                if (err) {
                  console.log("An error occured", err);
                  return;
                }
                setGlobalTokens((prevGlobalTokens) => [
                  ...prevGlobalTokens,
                  [res, response.data],
                ]);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
    });
    setTokensList(globalTokens);
    setIsLoading(false);
  };

  return (
    <div style={containerstyle}>
      <h1>VIEW</h1>
      <button
        className="button button1"
        onClick={() => {
          !!account
            ? getUserTokens()
            : alert(
                "Please ensure your web3 wallet is connected before proceeding."
              );
        }}
      >
        VIEW MY FLAGS 📒
      </button>

      <button
        className="button button1"
        onClick={() => {
          getGlobalTokens();
        }}
      >
        VIEW ALL FLAGS 🌎
      </button>

      <div>
        {isLoading ? (
          <LoadingObject />
        ) : (
          tokensList.map((token, index) => {
            console.log(token);
            return (
              <div
                key={index}
                style={{
                  display: dimensions.width < DESKTOP_MIN ? "block" : "flex",
                  border: "2px solid #000",
                  padding: "5px",
                  margin: "15px auto",
                }}
              >
                {dimensions.width < DESKTOP_MIN && (
                  <img
                    src={token[1].image}
                    style={{
                      padding: "10px",
                      height: `${dimensions.width * 0.5}px`,
                    }}
                  />
                )}
                <div style={{ flex: "1", textAlign: "left" }}>
                  <h4>
                    {token[1].name || "Untitled"} [{token[1].edition} Edition]
                  </h4>
                  <h5>{token[1].description || "-"}</h5>
                  <h6>
                    {`Owner ${token[0]} ${token[0] === account ? "(you)" : ""}`}
                  </h6>
                  <p
                    style={{
                      fontSize: "55%",
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                  >
                    Flag Status: {token[1].attributes[0].value || "-"}
                  </p>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "1", padding: "0px 5px 0px 0px" }}>
                      <p className="text">Stars Background Image Title: </p>
                      <p
                        style={{
                          fontSize: "50%",
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      >
                        {token[1].attributes[2].value || "-"}
                      </p>
                    </div>
                    <div style={{ flex: "1", padding: "0px 5px 0px 0px" }}>
                      <p className="text">Stars Background Image Summary: </p>
                      <p
                        style={{
                          fontSize: "50%",
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      >
                        {token[1].attributes[3].value || "-"}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "1", padding: "0px 5px 0px 0px" }}>
                      <p className="text">Stripes Background Image Title: </p>
                      <p
                        style={{
                          fontSize: "50%",
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      >
                        {token[1].attributes[5].value || "-"}
                      </p>
                    </div>
                    <div style={{ flex: "1", padding: "0px 5px 0px 0px" }}>
                      <p className="text">Stripes Background Image Summary: </p>
                      <p
                        style={{
                          fontSize: "50%",
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      >
                        {token[1].attributes[6].value || "-"}
                      </p>
                    </div>
                  </div>

                  {token[0] === account && (
                    <div>
                      <UpdateFlagForm
                        contract={contract}
                        account={account}
                        tokenId={token[1].id}
                        dimensions={dimensions}
                      />
                      <TransferFlagForm
                        contract={contract}
                        account={account}
                        dimensions={dimensions}
                        tokenId={token[1].id}
                      />{" "}
                    </div>
                  )}
                </div>
                {dimensions.width > DESKTOP_MIN && (
                  <img
                    src={token[1].image}
                    style={{
                      flex: "1",
                      padding: "10px",
                      height: `${(dimensions.width * 0.5 * 3) / 5}px`,
                    }}
                  />
                )}
              </div>
            );
          })
        )}
        <br />
      </div>
    </div>
  );
};

export default ViewPage;
