"use es6";

import React, { useState } from "react";
import FormUI from "../components/FormUI";
import Flag from "../components/Flag";
import ImageArray from "../components/ImageArray";
import axios from "axios";
import { DESKTOP_MIN } from "../utils/Constants";
import LoadingObject from "../components/LoadingObject";
import ImageCropper from "../components/ImageCropper";

const MintPage = ({ contract, wallet, dimensions }) => {
  const [starsImageUrl, setStarsImageUrl] = useState("");
  const [stripesImageUrl, setStripesImageUrl] = useState("");
  const [starsImageBase64, setStarsImageBase64] = useState("");
  const [stripesImageBase64, setStripesImageBase64] = useState("");
  const [starsImageTitle, setStarsImageTitle] = useState("");
  const [stripesImageTitle, setStripesImageTitle] = useState("");
  const [starsImageSummary, setStarsImageSummary] = useState("");
  const [stripesImageSummary, setStripesImageSummary] = useState("");
  const [starsImages, setStarsImages] = useState([]);
  const [stripesImages, setStripesImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [starsLinkSubmitted, setStarsLinkSubmitted] = useState(false);
  const [stripesLinkSubmitted, setStripesLinkSubmitted] = useState(false);
  const [isStarsLoading, setIsStarsLoading] = useState(false);
  const [isStripesLoading, setIsStripesLoading] = useState(false);
  const [isMintLoading, setIsMintLoading] = useState(false);
  const [starsCropData, setStarsCropData] = useState(null);
  const [stripesCropData, setStripesCropData] = useState(null);

  const isValid =
    starsImageUrl &&
    stripesImageUrl &&
    starsCropData &&
    stripesCropData &&
    name &&
    description;

  const containerstyle = {
    backgroundColor: "#000000",
    padding: "50px",
    color: "#ffffff",
    minHeight: `${dimensions.height + 100}px`,
    textAlign: "left",
  };

  const handleMint = async () => {
    setIsMintLoading(true);
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
        starsBase64:
          starsCropData ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
        stripesBase64:
          stripesCropData ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
        starsTitle: starsImageTitle || "-",
        stripesTitle: stripesImageTitle || "-",
        starsSummary: starsImageSummary || "-",
        stripesSummary: stripesImageSummary || "-",
        name: name,
        description: description,
        lastChanged: lastChanged,
        changesLeft: 3,
      };
      await axios
        .post("https://flag-generator-api.herokuapp.com/generate", payload)
        .then(async (response) => {
          const URI = response.data;
          console.log(response.data);
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
                  name,
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
        })
        .catch(() => {
          console.log("Something went wrong.");
          setIsMintLoading(false);
        });
    });
  };

  return (
    <div style={containerstyle}>
      <div>
        <div>
          <p style={{ fontSize: "30px" }}>Step 1:</p>
          <p style={{ color: "#cccccc", fontSize: "20px" }}>
            Enter a url to grab source images for the stars background. (ex:
            www.pbs.org):
          </p>
          <FormUI
            setArrayImages={setStarsImages}
            setImageTitle={setStarsImageTitle}
            setSubmitted={setStarsLinkSubmitted}
            setIsLoading={setIsStarsLoading}
          />
          <br />
          <ImageArray
            selection={starsImageUrl}
            setImageSelection={setStarsImageUrl}
            setBase64Selection={setStarsImageBase64}
            setSummarySelection={setStarsImageSummary}
            isLoading={isStarsLoading}
            imgs={starsImages}
            submitted={starsLinkSubmitted}
          />
          {!!starsImageBase64 && (
            <div>
              <p style={{ color: "#cccccc", fontSize: "15px" }}>
                Stars Background Image Title: {starsImageTitle}
              </p>
              <div
                style={{
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    flexWrap: "wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  <p style={{ color: "#cccccc", fontSize: "15px" }}>
                    Selected Stars Background Image:
                  </p>
                  <ImageCropper
                    section="stars"
                    url={starsImageBase64}
                    cropData={starsCropData}
                    setCropData={setStarsCropData}
                  />
                </div>
                <div
                  style={{
                    flexWrap: "wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  <p style={{ color: "#cccccc", fontSize: "15px" }}>
                    Selected Stars Background Image Summary:
                  </p>
                  <p style={{ color: "#ffffff", fontSize: "15px" }}>
                    {starsImageSummary}
                  </p>
                </div>
              </div>
            </div>
          )}
          <br />
          <p style={{ fontSize: "30px" }}>Step 2:</p>
          <p style={{ color: "#cccccc", fontSize: "20px" }}>
            Enter a url to grab source images for the stripes background. (ex:
            www.npr.com):
          </p>
          <FormUI
            setArrayImages={setStripesImages}
            setImageTitle={setStripesImageTitle}
            setSubmitted={setStripesLinkSubmitted}
            setIsLoading={setIsStripesLoading}
          />
          <br />
          <ImageArray
            selection={stripesImageUrl}
            setImageSelection={setStripesImageUrl}
            setBase64Selection={setStripesImageBase64}
            setSummarySelection={setStripesImageSummary}
            isLoading={isStripesLoading}
            imgs={stripesImages}
            submitted={stripesLinkSubmitted}
          />
          {!!stripesImageBase64 && (
            <div>
              <p style={{ color: "#cccccc", fontSize: "15px" }}>
                Stripes Background Image Title: {stripesImageTitle}
              </p>

              <div
                style={{
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    flexWrap: "wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  <p style={{ color: "#cccccc", fontSize: "15px" }}>
                    Selected Stripes Background Image:
                  </p>
                  <ImageCropper
                    section="stripes"
                    url={stripesImageBase64}
                    cropData={stripesCropData}
                    setCropData={setStripesCropData}
                  />
                </div>
                <div
                  style={{
                    flexWrap: "wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  <p style={{ color: "#cccccc", fontSize: "15px" }}>
                    Selected Stripes Background Image Summary:
                  </p>
                  <p style={{ color: "#ffffff", fontSize: "15px" }}>
                    {stripesImageSummary}
                  </p>
                </div>
              </div>
            </div>
          )}
          <br />
          <p style={{ fontSize: "30px" }}>Step 3:</p>
          <p style={{ color: "#cccccc", fontSize: "20px" }}>
            Write a short excerpt about the description, story, or significance
            of this flag:
          </p>
          <br />
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                margin: "auto",
                width:
                  dimensions.width >= 500
                    ? Math.min(dimensions.width * 0.75, 1000)
                    : Math.min(dimensions.width * 0.75, 500),
              }}
            >
              <Flag
                width={
                  dimensions.width >= 500
                    ? Math.min(dimensions.width * 0.75, 1000)
                    : Math.min(dimensions.width * 0.75, 500)
                }
                starsBackgroundImage={starsCropData}
                stripesBackgroundImage={stripesCropData}
              />
            </div>
          </div>
          <br />
          <textarea
            className="textInput"
            style={{
              width: "100%",
              whiteSpace: "pre-wrap",
            }}
            type="text"
            value={name}
            placeholder="Give your flag a name."
            onChange={(event) => setName(event.target.value)}
          />
          <br />
          <textarea
            className="textInput"
            style={{
              width: "100%",
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
            <br />
            <br />
            {isMintLoading && <LoadingObject size=".25" />}{" "}
            <button
              style={{ width: "300px", fontSize: "20px", margin: "auto" }}
              className={isValid ? "button" : "button disabled"}
              onClick={() => {
                !!wallet
                  ? handleMint()
                  : alert(
                      "Please ensure your web3 wallet is connected before proceeding."
                    );
              }}
            >
              Mint
            </button>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default MintPage;
