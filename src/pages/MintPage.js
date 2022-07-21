"use es6";

import React, { useState, useEffect } from "react";
import FormUI from "../components/FormUI";
import Flag from "../components/Flag";
import ImageArray from "../components/ImageArray";
import axios from "axios";

const MintPage = ({ contract, account, dimensions }) => {
  const [starsImageUrl, setStarsImageUrl] = useState("");
  const [stripesImageUrl, setStripesImageUrl] = useState("");
  const [starsImages, setStarsImages] = useState([]);
  const [stripesImages, setStripesImages] = useState([]);
  const [description, setDescription] = useState("");
  const [starsLinkSubmitted, setStarsLinkSubmitted] = useState(false);
  const [stripesLinkSubmitted, setStripesLinkSubmitted] = useState(false);
  const [tokenMetadataURIs, setTokenMetadataURIs] = useState([]);
  const [numTokens, setNumTokens] = useState(1);

  const containerstyle = {
    width: "95%",
    margin: "auto",
  };

  const handleMint = async () => {
    setTokenMetadataURIs([]);
    await contract.methods.totalSupply().call(async (err, res) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      const totalSupply = Number(res);
      for (let i = 1; i <= numTokens; i++) {
        const payload = {
          id: totalSupply + i,
          stars:
            starsImageUrl.length > 0
              ? starsImageUrl
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png",
          stripes:
            stripesImageUrl.length > 0
              ? stripesImageUrl
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png",
          description: description,
          changesLeft: 3,
        };
        await axios
          .post("https://flag-generator-api.herokuapp.com/generate", payload)
          .then(async (response) => {
            await setTokenMetadataURIs((prevTokenMetadataURIs) => [
              ...prevTokenMetadataURIs,
              response.data,
            ]);
          })
          .catch(() => {
            console.log("Something went wrong.");
          });
      }
      if (tokenMetadataURIs.length > 0) {
        await contract.methods.cost().call(async (err, res) => {
          if (err) {
            console.log("An error occured", err);
            return;
          }
          const cost = Number(res);
          await contract.methods
            .mint(
              account,
              numTokens,
              starsImageUrl,
              stripesImageUrl,
              description,
              tokenMetadataURIs
            )
            .send(
              { value: numTokens * cost, from: account },
              async (err, res) => {
                if (err) {
                  console.log("An error occured", err);
                  return;
                }
                alert(`Transaction Received!\nTransaction Hash: ${res}`);
              }
            );
        });
      } else {
        alert("Error processing flag metadata. Please try again.");
      }
    });
  };

  return (
    <div style={containerstyle}>
      <h1>MINT</h1>
      <div>
        <div>
          <h3>Step 1:</h3>
          <h4>
            Enter a url to grab source images for the stars background. (ex:
            www.pbs.org):
          </h4>
          <FormUI
            setArrayImages={setStarsImages}
            setSubmitted={setStarsLinkSubmitted}
          />
          <br />
          <ImageArray
            selection={starsImageUrl}
            setSelection={setStarsImageUrl}
            imgs={starsImages}
            submitted={starsLinkSubmitted}
          />
          <h5>Selected Stars Background Url:</h5>
          <h6 style={{ color: "#0c0" }}>{starsImageUrl}</h6>
          <br />
          <h3>Step 2:</h3>
          <h4>
            Enter a url to grab source images for the stripes background. (ex:
            www.npr.com):
          </h4>
          <FormUI
            setArrayImages={setStripesImages}
            setSubmitted={setStripesLinkSubmitted}
          />
          <br />
          <ImageArray
            selection={stripesImageUrl}
            setSelection={setStripesImageUrl}
            imgs={stripesImages}
            submitted={stripesLinkSubmitted}
          />
          <h5>Selected stripes background url:</h5>
          <h6 style={{ color: "#0c0" }}>{stripesImageUrl}</h6>
          <br />
          <h3>Step 3:</h3>
          <h4>
            Write a short excerpt about the description, story, or significance
            of this flag:
          </h4>
          <br />
          <Flag
            width={Math.min(dimensions.width * 0.75, 500)}
            starsBackgroundImage={starsImageUrl}
            stripesBackgroundImage={stripesImageUrl}
          />
          <br />
          <textarea
            className="textInput"
            style={{
              width: "85%",
              whiteSpace: "pre-wrap",
            }}
            type="text"
            value={description}
            placeholder="Write your flag description here..."
            onChange={(event) => setDescription(event.target.value)}
          />
          <br />
          <br />
          <br />
          <h3>Step 4:</h3>
          <h4>Pick your desired number of copies for this flag and mint!</h4>
          <input
            type="number"
            value={numTokens}
            min="1"
            max="3"
            onChange={(event) => setNumTokens(event.target.value)}
          />
          <button
            onClick={() => {
              handleMint(numTokens);
            }}
          >
            {numTokens < 2
              ? "MINT FLAG  🇺🇸"
              : numTokens > 1 && numTokens < 3
              ? "MINT FLAGS  🇺🇸🇺🇸"
              : "MINT FLAGS  🇺🇸🇺🇸🇺🇸"}
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default MintPage;
