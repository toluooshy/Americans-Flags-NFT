"use es6";

import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateFlagForm from "../components/UpdateFlagForm";
import TransferFlagForm from "../components/TransferFlagForm";

const ViewPage = ({ contract, account, dimensions }) => {
  const [userTokens, setUserTokens] = useState([]);
  const [globalTokens, setGlobalTokens] = useState([]);
  const [tokensList, setTokensList] = useState(userTokens);

  const containerstyle = {
    width: "95%",
    margin: "auto",
  };

  useEffect(() => {
    !!account && getUserTokens();
  }, []);

  const getUserTokens = async () => {
    setTokensList(userTokens);
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
  };

  const getGlobalTokens = async () => {
    setTokensList(globalTokens);
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
  };

  return (
    <div style={containerstyle}>
      <h1>VIEW</h1>
      <button
        onClick={async () => {
          !!account
            ? await getUserTokens()
            : alert(
                "Please ensure your web3 wallet is connected before proceeding."
              );
        }}
      >
        VIEW MY FLAGS
      </button>

      <button
        onClick={async () => {
          await getGlobalTokens();
        }}
      >
        VIEW ALL FLAGS
      </button>

      <div>
        {tokensList.map((token, index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <div style={{ flex: "1" }}>
                <h4>
                  {token[1].name || "Untitled"} [{token[1].edition} Edition]
                </h4>
                <h5>{token[1].description || "-"}</h5>
                <h6>
                  Owner: {`${token[0]} ${token[0] === account ? "(you)" : ""}`}
                </h6>
                <p style={{ fontSize: "10px" }}>
                  Flag Status: {token[1].attributes[0].value || "-"}
                </p>
                <p style={{ fontSize: "10px" }}>
                  Stars Background Image Url:{" "}
                  {token[1].attributes[1].value || "-"}
                </p>
                <p style={{ fontSize: "10px" }}>
                  Stars Background Image Title:{" "}
                  {token[1].attributes[2].value || "-"}
                </p>
                <p style={{ fontSize: "10px" }}>
                  Stars Background Image Summary:{" "}
                  {token[1].attributes[3].value || "-"}
                </p>
                <p style={{ fontSize: "10px" }}>
                  Stripes Background Image Url:{" "}
                  {token[1].attributes[4].value || "-"}
                </p>
                <p style={{ fontSize: "10px" }}>
                  Stripes Background Image Title:{" "}
                  {token[1].attributes[5].value || "-"}
                </p>
                <p style={{ fontSize: "10px" }}>
                  Stripes Background Image Summary:{" "}
                  {token[1].attributes[6].value || "-"}
                </p>

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
                />
              </div>

              <img
                src={token[1].image}
                style={{
                  flex: "1",
                  padding: "10px",
                  height: `${(dimensions.width * 0.5 * 3) / 5}px`,
                }}
              />
            </div>
          );
        })}
        <br />
      </div>
    </div>
  );
};

export default ViewPage;
