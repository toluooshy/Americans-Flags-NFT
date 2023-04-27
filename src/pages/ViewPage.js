"use es6";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import UpdateFlagForm from "../components/UpdateFlagForm";
import TransferFlagForm from "../components/TransferFlagForm";
import LoadingObject from "../components/LoadingObject";
import { DESKTOP_MIN } from "../utils/Constants";
import { saveAs } from "file-saver";

const ViewPage = ({ contract, wallet, dimensions }) => {
  const [tokens, setTokens] = useState(null);
  const [isGlobal, setIsGlobal] = useState(false);

  useEffect(() => {
    setIsGlobal(false);
  }, []);

  const containerstyle = {
    margin: "auto",
    padding: "50px 0px",
    backgroundColor: "#000000",
    minHeight: `${dimensions.height + 100}px`,
    color: "#ffffff",
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
        setTokens([]);
        console.log(res);
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
        console.log(tokens);
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

  const downloadFlag = (src) => {
    saveAs(src, `AFN-${Date.now()}.png`);
  };

  return (
    <div style={{ backgroundColor: "#000000" }}>
      <div style={containerstyle}>
        <button
          className="button button1"
          style={{
            color: !isGlobal ? "#000000" : "#ffffff",
            backgroundColor: isGlobal ? "#000000" : "#ffffff",
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
            color: isGlobal ? "#000000" : "#ffffff",
            backgroundColor: !isGlobal ? "#000000" : "#ffffff",
          }}
          onClick={() => {
            setIsGlobal(true);
            getTokens(true);
          }}
        >
          VIEW ALL FLAGS 🌎
        </button>

        <a
          href="https://testnets.opensea.io/collection/americans-flags-nft-test-v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="button button1" onClick="window.location.href=''">
            OPENSEA ⛵️
          </button>
        </a>
        <br />
        <br />
        <br />
        <div>
          {!!tokens && tokens.length === 0 && (
            <p style={{ fontSize: "16px" }}>
              You can start creating your very own Americans Flags NFT by
              heading over to the 'Mint' page! 🇺🇸
            </p>
          )}
          {!!tokens ? (
            tokens.map((token, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: dimensions.width < DESKTOP_MIN ? "block" : "flex",
                    padding: "50px",
                  }}
                >
                  {dimensions.width < DESKTOP_MIN && (
                    <div>
                      <img
                        src={token[1].image}
                        style={{
                          height: `${dimensions.width * 0.5}px`,
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </div>
                  )}
                  <div
                    style={{
                      flex: "1",
                      justifyContent: "center",
                      textAlign: "left",
                      paddingLeft: "2px",
                      width: "100%",
                    }}
                  >
                    <h4
                      style={{
                        height: "10px",
                      }}
                    >
                      {token[1].name.split(":")[0]} [{token[1].edition} Edition]
                    </h4>
                    <h5
                      style={{
                        height: "0px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        fontSize: "24px",
                      }}
                    >
                      {token[1].name.split(": ")[1] || '"Untitled"'}
                    </h5>
                    <h5
                      style={{
                        height: "0px",
                        fontStyle: "italic",
                      }}
                    >
                      {token[1].description || "(No description available)"}
                    </h5>
                    <br />
                    <br />
                    {Number(token[1].attributes[8].value) === 3 ? (
                      <p style={{ color: "#0f0", fontSize: "16px" }}>
                        (3 Changes Left)
                      </p>
                    ) : Number(token[1].attributes[8].value) === 2 ? (
                      <p style={{ color: "#fc0", fontSize: "16px" }}>
                        (2 Changes Left)
                      </p>
                    ) : Number(token[1].attributes[8].value) === 1 ? (
                      <p style={{ color: "#f00", fontSize: "16px" }}>
                        (1 Change Left)
                      </p>
                    ) : (
                      <p
                        style={{
                          color: "#000",
                          fontSize: "16px",
                          fontStyle: "italic",
                        }}
                      >
                        (Locked)
                      </p>
                    )}
                    {!!token[1].attributes[7].value && (
                      <p style={{ color: "#ff0", fontSize: "16px" }}>
                        Last updated on{" "}
                        {new Date(
                          token[1].attributes[7].value
                        ).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                        fontSize: "14px",
                      }}
                    >
                      <div style={{}}>Owner:</div>
                      <div>{token[0]}</div>
                      {!!wallet && (
                        <div style={{ padding: "0px 5px", color: "#cccccc" }}>
                          {token[0].toLowerCase() === wallet.toLowerCase() &&
                            "(you)"}
                        </div>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "18px",
                        fontStyle: "italic",
                        fontWeight: "bold",
                      }}
                    >
                      Flag Status: {token[1].attributes[0].value || "-"}
                    </p>
                    <div style={{ display: "flex" }}>
                      <div style={{ flex: "1", padding: "0px 5px 0px 0px" }}>
                        <p style={{ color: "#cccccc", fontSize: "12px" }}>
                          Stars Background Image Title:{" "}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            fontStyle: "italic",
                            fontWeight: "bold",
                          }}
                        >
                          {token[1].attributes[2].value || "-"}
                        </p>
                      </div>
                      <div style={{ flex: "1", padding: "0px 5px 0px 0px" }}>
                        <p style={{ color: "#cccccc", fontSize: "12px" }}>
                          Stars Background Image Summary:{" "}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
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
                        <p style={{ color: "#cccccc", fontSize: "12px" }}>
                          Stripes Background Image Title:{" "}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            fontStyle: "italic",
                            fontWeight: "bold",
                          }}
                        >
                          {token[1].attributes[5].value || "-"}
                        </p>
                      </div>
                      <div style={{ flex: "1", padding: "0px 5px 0px 0px" }}>
                        <p style={{ color: "#cccccc", fontSize: "12px" }}>
                          Stripes Background Image Summary:{" "}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            fontStyle: "italic",
                            fontWeight: "bold",
                          }}
                        >
                          {token[1].attributes[6].value || "-"}
                        </p>
                      </div>
                    </div>
                    {!!wallet && (
                      <div>
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
                    )}
                  </div>
                  {dimensions.width > DESKTOP_MIN && (
                    <div>
                      <div>
                        <img
                          src={token[1].image}
                          style={{
                            height: `${dimensions.width / 3}px`,
                            border: "none",
                            outline: "none",
                          }}
                        />
                      </div>
                      <button
                        className="button button2"
                        onClick={() => {
                          downloadFlag(token[1].image);
                        }}
                      >
                        Download Flag 💾
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div>
              <p style={{ fontSize: "16px" }}>
                Please make sure that your wallet is connected.
              </p>
              <br />
              <LoadingObject />
            </div>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
