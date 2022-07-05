"use es6";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Flag from "../components/Flag";
import FormUI from "../components/FormUI";
import axios from "axios";
import UpdateFlagForm from "../components/UpdateFlagForm";
import TransferFlagForm from "../components/TransferFlagForm";

const ViewPage = ({ contract, account, dimensions }) => {
  const [userTokens, setUserTokens] = useState([]);
  const [subjectTokenId, setSubjectTokenId] = useState();
  const [top, setTop] = useState();

  const containerstyle = {
    width: "95%",
    margin: "auto",
  };

  console.log(dimensions.width * 0.6);

  useEffect(() => {
    !!account && getTokens();
  }, []);

  const getTokens = async () => {
    setUserTokens([]);
    await contract.methods.walletOfOwner(account).call(async (err, res) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      const userTokenIndexes = res.map((i) => Number(i));
      console.log(userTokenIndexes);
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
              .then((response) => {
                setUserTokens((prevUserTokens) => [
                  ...prevUserTokens,
                  response.data,
                ]);
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
            ? await getTokens()
            : alert(
                "Please ensure your web3 wallet is connected before proceeding."
              );
        }}
      >
        GET TOKENS
      </button>

      <div>
        {userTokens.map((token, index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <div style={{ flex: "1" }}>
                <h4>
                  {token.name || "Untitled"} [{token.edition} Edition]
                </h4>
                <h6>{token.description || "-"}</h6>
                {/* <p>Stars background image url: {token.attributes[0] || "-"}</p>
              <p>Stripes background image url: {token.attributes[1] || "-"}</p> */}

                <UpdateFlagForm
                  contract={contract}
                  account={account}
                  dimensions={dimensions}
                  tokenId={token.id}
                />
                <TransferFlagForm
                  contract={contract}
                  account={account}
                  dimensions={dimensions}
                  tokenId={token.id}
                />
              </div>

              <img
                src={token.image}
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
