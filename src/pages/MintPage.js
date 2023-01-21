"use es6";

import React, { useState } from "react";
import FormUI from "../components/FormUI";
import Flag from "../components/Flag";
import ImageArray from "../components/ImageArray";
import axios from "axios";
import { DESKTOP_MIN } from "../utils/Constants";
import LoadingObject from "../components/LoadingObject";

const MintPage = ({ contract, wallet, dimensions }) => {
  const [starsImageUrl, setStarsImageUrl] = useState("");
  const [stripesImageUrl, setStripesImageUrl] = useState("");
  const [starsImageTitle, setStarsImageTitle] = useState("");
  const [stripesImageTitle, setStripesImageTitle] = useState("");
  const [starsImageSummary, setStarsImageSummary] = useState("");
  const [stripesImageSummary, setStripesImageSummary] = useState("");
  const [starsImages, setStarsImages] = useState([]);
  const [stripesImages, setStripesImages] = useState([]);
  const [description, setDescription] = useState("");
  const [starsLinkSubmitted, setStarsLinkSubmitted] = useState(false);
  const [stripesLinkSubmitted, setStripesLinkSubmitted] = useState(false);
  const [isStarsLoading, setIsStarsLoading] = useState(false);
  const [isStripesLoading, setIsStripesLoading] = useState(false);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [URI, setURI] = useState([]);

  const isValid = starsImageUrl && stripesImageUrl && description;

  const containerstyle = {
    width: "95%",
    margin: "auto",
  };

  const handleMint = async () => {
    setIsMintLoading(true);
    setURI(null);
    await contract.methods.totalSupply().call(async (err, res) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      const totalSupply = Number(res);
      const lastChanged = Date.now();

      const payload = {
        id: totalSupply + 1,
        starsUrl:
          starsImageUrl ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png",
        stripesUrl:
          stripesImageUrl ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png",
        starsTitle: starsImageTitle || "-",
        stripesTitle: stripesImageTitle || "-",
        starsSummary: starsImageSummary || "-",
        stripesSummary: stripesImageSummary || "-",
        description: description,
        lastChanged: lastChanged,
        changesLeft: 3,
      };
      await axios
        .post("https://flag-generator-api.herokuapp.com/generate", payload)
        .then(async (response) => {
          await setURI(response.data);
        })
        .catch(() => {
          console.log("Something went wrong.");
        });
      console.log(URI);
      if (URI.length > 0) {
        await contract.methods.cost().call(async (err, res) => {
          if (err) {
            console.log("An error occured", err);
            return;
          }
          const cost = Number(res);
          await contract.methods
            .mint(
              wallet,
              starsImageUrl,
              stripesImageUrl,
              starsImageTitle,
              stripesImageTitle,
              starsImageSummary,
              stripesImageSummary,
              description,
              URI,
              lastChanged
            )
            .send({ value: cost, from: wallet }, async (err, res) => {
              if (err) {
                console.log("An error occured", err);
                setIsMintLoading(false);
                return;
              }
              alert(`Transaction Received!\nTransaction Hash: ${res}`);
              setIsMintLoading(false);
            });
        });
      } else {
        alert("Error processing flag metadata. Please try again.");
        setIsMintLoading(false);
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
            setImageTitle={setStarsImageTitle}
            setSubmitted={setStarsLinkSubmitted}
            setIsLoading={setIsStarsLoading}
          />
          <br />
          <h5>Stars Background Image Title: {starsImageTitle}</h5>
          <ImageArray
            selection={starsImageUrl}
            setImageSelection={setStarsImageUrl}
            setSummarySelection={setStarsImageSummary}
            isLoading={isStarsLoading}
            imgs={starsImages}
            submitted={starsLinkSubmitted}
          />
          <div
            style={{
              display: dimensions.width > DESKTOP_MIN ? "flex" : "block",
              margin: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "50%",
                flexWrap: "wrap",
                overflowWrap: "break-word",
                margin: "auto",
              }}
            >
              <h5 style={{ width: "100%" }}>
                Selected Stars Background Image Url:
              </h5>
              <h6 style={{ color: "#0c0", width: "100%" }}>{starsImageUrl}</h6>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexWrap: "wrap",
                overflowWrap: "break-word",
                margin: "auto",
              }}
            >
              <h5 style={{ width: "100%" }}>
                Selected Stars Background Image Summary:
              </h5>
              <h6 style={{ color: "#0c0", width: "100%" }}>
                {starsImageSummary}
              </h6>
            </div>
          </div>
          <br />
          <h3>Step 2:</h3>
          <h4>
            Enter a url to grab source images for the stripes background. (ex:
            www.npr.com):
          </h4>
          <FormUI
            setArrayImages={setStripesImages}
            setImageTitle={setStripesImageTitle}
            setSubmitted={setStripesLinkSubmitted}
            setIsLoading={setIsStripesLoading}
          />
          <br />
          <h5>Stripes Background Image Title: {stripesImageTitle}</h5>
          <ImageArray
            selection={stripesImageUrl}
            setImageSelection={setStripesImageUrl}
            setSummarySelection={setStripesImageSummary}
            isLoading={isStripesLoading}
            imgs={stripesImages}
            submitted={stripesLinkSubmitted}
          />
          <div
            style={{
              display: dimensions.width > DESKTOP_MIN ? "flex" : "block",
              margin: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "50%",
                flexWrap: "wrap",
                overflowWrap: "break-word",
                margin: "auto",
              }}
            >
              <h5 style={{ width: "100%" }}>
                Selected Stripes Background Image Url:
              </h5>
              <h6 style={{ color: "#0c0", width: "100%" }}>
                {stripesImageUrl}
              </h6>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                flexWrap: "wrap",
                overflowWrap: "break-word",
                margin: "auto",
              }}
            >
              <h5 style={{ width: "100%" }}>
                Selected Stripes Background Image Summary:
              </h5>
              <h6 style={{ color: "#0c0", width: "100%" }}>
                {stripesImageSummary}
              </h6>
            </div>
          </div>
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
          <div style={{ textAlign: "center" }}>
            {isMintLoading && <LoadingObject size=".5" />}
          </div>
          <button
            style={{ width: "300px", fontSize: "20px" }}
            className={isValid ? "button button1" : "button disabled"}
            onClick={() => {
              !!wallet
                ? handleMint()
                : alert(
                    "Please ensure your web3 wallet is connected before proceeding."
                  );
            }}
          >
            MINT FLAG 🇺🇸
          </button>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default MintPage;
