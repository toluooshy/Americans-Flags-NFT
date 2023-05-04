import React, { useState } from "react";
import FormUI from "../components/FormUI";
import Flag from "../components/Flag";
import ImageArray from "../components/ImageArray";
import axios from "axios";
import { DESKTOP_MIN } from "../utils/Constants";
import LoadingObject from "./LoadingObject";
import ImageCropper from "../components/ImageCropper";

const UpdateFlagForm = ({
  contract,
  wallet,
  tokenId,
  dimensions,
  getTokens,
}) => {
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
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [starsCropData, setStarsCropData] = useState(null);
  const [stripesCropData, setStripesCropData] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const isValid =
    starsImageUrl &&
    stripesImageUrl &&
    starsCropData &&
    stripesCropData &&
    name &&
    description;

  const handleUpdate = async () => {
    setIsUpdateLoading(true);
    await contract.methods.flags(tokenId).call(async (err, res) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      const lastChanged = Date.now();
      const changesLeft = Number(res.changesLeft) - 1;

      const payload = {
        id: tokenId,
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
        changesLeft: changesLeft,
      };
      await axios
        .post("https://flag-generator-api.herokuapp.com/generate", payload)
        .then(async (response) => {
          const URI = response.data;
          if (URI.length > 0) {
            await contract.methods
              .setFlagData(
                tokenId,
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
              .send({ from: wallet }, async (err, res) => {
                if (err) {
                  setIsUpdateLoading(false);
                  return;
                }
                alert(`Transaction Received!\nTransaction Hash: ${res}`);
                setIsUpdateLoading(false);
              })
              .then(() => {
                getTokens(false);
              });
          } else {
            alert("Error processing flag metadata. Please try again.");
            setIsUpdateLoading(false);
          }
        })
        .catch(() => {
          console.log("Something went wrong.");
        });
    });
  };

  return (
    <div style={{ textAlign: "left" }}>
      <button
        className="button"
        style={{ top: "0px", left: "0px" }}
        onClick={() => {
          setVisibility(!visibility);
        }}
      >
        {!!visibility ? "^" : "Update Flag >"}
      </button>

      {!!visibility && (
        <div
          style={{
            color: "#eeeeee",
            padding: "1px 20px",
            backgroundColor: "#222",
          }}
        >
          <p style={{ fontSize: "30px" }}>Update Flag #{tokenId}:</p>
          <p className="text" style={{ color: "#cccccc", fontSize: "15px" }}>
            Stars background source images url: {starsImageTitle}
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
            width="100%"
          />
          {!!starsImageBase64 && (
            <div>
              <p
                className="text"
                style={{ color: "#cccccc", fontSize: "15px" }}
              >
                Stars background image title: {starsImageTitle}
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
                    Selected stars background image:
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
                    Selected stars background image summary:
                  </p>
                  <p style={{ color: "#ffffff", fontSize: "15px" }}>
                    {starsImageSummary}
                  </p>
                </div>
              </div>
            </div>
          )}
          <br />
          <p className="text" style={{ color: "#cccccc", fontSize: "15px" }}>
            Stripes background source images url: {stripesImageTitle}
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
            width="100%"
          />
          {!!stripesImageBase64 && (
            <div>
              <p
                className="text"
                style={{ color: "#cccccc", fontSize: "15px" }}
              >
                Stripes background image title: {stripesImageTitle}
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
                    Selected stripes background image:
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
                    Selected stripes background image summary:
                  </p>
                  <p style={{ color: "#ffffff", fontSize: "15px" }}>
                    {stripesImageSummary}
                  </p>
                </div>
              </div>
            </div>
          )}
          <br />
          <div
            style={{
              backgroundColor: "#000000",
            }}
          >
            <div
              style={{
                margin: "auto",
                width: Math.min(dimensions.width * 0.5, 350),
              }}
            >
              <Flag
                width={Math.min(dimensions.width * 0.5, 350)}
                starsBackgroundImage={starsCropData}
                stripesBackgroundImage={stripesCropData}
              />
            </div>
          </div>
          <br />
          <div style={{ padding: "0px 4px 0px 0px" }}>
            <p
              style={{
                margin: "11px 0px",
                fontSize: "13px",
                color: !!name ? "#0c0" : "#ff4444",
              }}
            >
              New name*
            </p>

            <textarea
              className="textInput"
              style={{
                width: "100%",
                whiteSpace: "pre-wrap",
              }}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <br />
            <p
              style={{
                margin: "11px 0px",
                fontSize: "13px",
                color: !!description ? "#0c0" : "#ff4444",
              }}
            >
              New description*
            </p>
            <textarea
              className="textInput"
              style={{
                width: "100%",
                whiteSpace: "pre-wrap",
              }}
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <br />
          <br />
          <div
            style={{
              margin: "0px 0px -50px 20px",
            }}
          >
            <br />
            <br />
            {isUpdateLoading && <LoadingObject size=".25" />}
          </div>
          <button
            style={{ width: "250px", fontSize: "20px" }}
            className={isValid ? "button" : "button disabled"}
            onClick={() => {
              handleUpdate();
            }}
          >
            Update
          </button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default UpdateFlagForm;
