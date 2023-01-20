"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateFlagForm from "../components/UpdateFlagForm";
import TransferFlagForm from "../components/TransferFlagForm";
import LoadingObject from "../components/LoadingObject";
import { DESKTOP_MIN } from "../utils/Constants";

const ViewPage = ({ contract, wallet, dimensions }) => {
  const [tokens, setTokens] = useState(null);
  const [isGlobal, setIsGlobal] = useState(false);

  const containerstyle = {
    width: "95%",
    margin: "auto",
  };

  useEffect(() => {
    !!wallet && getTokens(false);
  }, []);

  const getTokens = async (isGlobal) => {
    setTokens(null);
    if (isGlobal) {
      await contract.methods.totalSupply().call(async (err, res) => {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        await contract.methods.totalSupply().call(async (err, res) => {
          if (err) {
            console.log("An error occured", err);
            return;
          }

          setTokens([]);
          for (let i = 1; i <= res; i++) {
            await contract.methods.flags(i).call(async (err, res) => {
              if (err) {
                console.log("An error occured", err);
                return;
              }
              await axios
                .get(
                  `https://americans-flags-nft.${res.URI.split("https://")[1]}`
                )
                .then(async (response) => {
                  await contract.methods.ownerOf(i).call(async (err, res) => {
                    if (err) {
                      console.log("An error occured", err);
                      return;
                    }
                    setTokens((prevTokens) => [
                      ...prevTokens,
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
      });
    } else {
      await contract.methods.walletOfOwner(wallet).call(async (err, res) => {
        if (err) {
          console.log("An error occured", err);
          return;
        }

        setTokens([]);
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
                .get(
                  `https://americans-flags-nft.${res.URI.split("https://")[1]}`
                )
                .then(async (response) => {
                  await contract.methods
                    .ownerOf(userTokenIndexes[i])
                    .call(async (err, res) => {
                      if (err) {
                        console.log("An error occured", err);
                        return;
                      }
                      setTokens((prevTokens) => [
                        ...prevTokens,
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
    }
  };

  return (
    <div style={containerstyle}>
      <h1>VIEW</h1>
      <button
        className="button button1"
        style={{
          color: isGlobal ? "#000000" : "#ffffff",
          backgroundColor: !isGlobal ? "#000000" : "#ffffff",
        }}
        onClick={() => {
          setIsGlobal(false);
          !!wallet
            ? getTokens(false)
            : alert(
                "Please ensure your web3 wallet is connected before proceeding."
              );
        }}
      >
        VIEW MY FLAGS 📒
      </button>

      <button
        className="button button1"
        style={{
          color: !isGlobal ? "#000000" : "#ffffff",
          backgroundColor: isGlobal ? "#000000" : "#ffffff",
        }}
        onClick={() => {
          setIsGlobal(true);
          getTokens(true);
        }}
      >
        VIEW ALL FLAGS 🌎
      </button>

      <button
        className="button button1"
        style={{
          color: !isGlobal ? "#000000" : "#ffffff",
          backgroundColor: isGlobal ? "#000000" : "#ffffff",
        }}
        onClick="window.location.href='https://www.opensea.com';"
      >
        OPENSEA ⛵️
      </button>

      <div>
        {!!tokens && tokens.length === 0 && (
          <p style={{ fontSize: "12px" }}>
            You can start creating your very own Americans Flags NFT by heading
            over to the 'Mint' page! 🇺🇸
          </p>
        )}
        {!!tokens && !!wallet ? (
          tokens.map((token, index) => {
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
                <div style={{ flex: "1", textAlign: "center" }}>
                  <h4
                    style={{
                      height: "10px",
                    }}
                  >
                    {token[1].name || "Untitled"} [{token[1].edition} Edition]
                  </h4>
                  <h5
                    style={{
                      height: "0px",
                      fontStyle: "italic",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}
                  >
                    "{token[1].description || "-"}"
                  </h5>
                  {Number(token[1].attributes[7].value) === 3 ? (
                    <p style={{ color: "#060", fontSize: "12px" }}>
                      (3 Changes Left)
                    </p>
                  ) : Number(token[1].attributes[7].value) === 2 ? (
                    <p style={{ color: "#a60", fontSize: "12px" }}>
                      (2 Changes Left)
                    </p>
                  ) : Number(token[1].attributes[7].value) === 1 ? (
                    <p style={{ color: "#600", fontSize: "12px" }}>
                      (1 Change Left)
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "#000",
                        fontSize: "12px",
                        fontStyle: "italic",
                      }}
                    >
                      (Locked)
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      flexWrap: "wrap",
                      fontSize: "10px",
                    }}
                  >
                    <div style={{ padding: "0px 5px" }}>Owner:</div>
                    <div>{token[0]}</div>
                    <div style={{ padding: "0px 5px", color: "#060" }}>
                      {token[0].toLowerCase() === wallet.toLowerCase() &&
                        "(you)"}
                    </div>
                  </div>
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
                  {token[0].toLowerCase() === wallet.toLowerCase() && (
                    <div>
                      <UpdateFlagForm
                        contract={contract}
                        wallet={wallet}
                        tokenId={token[1].id}
                        dimensions={dimensions}
                        getTokens={getTokens}
                      />
                      <TransferFlagForm
                        contract={contract}
                        wallet={wallet}
                        dimensions={dimensions}
                        tokenId={token[1].id}
                        getTokens={getTokens}
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
        ) : (
          <div>
            <p style={{ fontSize: "12px" }}>
              Please make sure that your wallet is connected.
            </p>
            <br />
            <LoadingObject />
          </div>
        )}
        <br />
      </div>
    </div>
  );
};

export default ViewPage;
