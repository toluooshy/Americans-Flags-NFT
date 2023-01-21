import React, { useState } from "react";
import FormUI from "../components/FormUI";
import Flag from "../components/Flag";
import ImageArray from "../components/ImageArray";
import axios from "axios";
import { DESKTOP_MIN } from "../utils/Constants";
import LoadingObject from "./LoadingObject";

const UpdateFlagForm = ({
  contract,
  wallet,
  tokenId,
  dimensions,
  getTokens,
}) => {
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
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [URI, setURI] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const isValid = starsImageUrl && stripesImageUrl && description;

  const handleUpdate = async () => {
    setIsUpdateLoading(true);
    await contract.methods.flags(tokenId).call(async (err, res) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      const lastChanged = Date.now();
      const changesLeft = Number(res.changesLeft);

      const payload = {
        id: tokenId,
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
        changesLeft: changesLeft,
      };
      await axios
        .post("https://flag-generator-api.herokuapp.com/generate", payload)
        .then((response) => {
          setURI(response.data);
        })
        .catch(() => {
          console.log("Something went wrong.");
        });
      console.log(URI);
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
    });
  };

  return (
    <div style={{ lineHeight: "70%" }}>
      <button
        className="button button1"
        style={{ top: "0px", left: "0px" }}
        onClick={() => {
          setVisibility(!visibility);
        }}
      >
        {!!visibility ? "^" : "UPDATE FLAG >"}
      </button>

      {!!visibility && (
        <div
          style={{
            color: "#eeeeee",
            textAlign: "center",
            padding: "1px 20px",
            backgroundColor: "#222",
          }}
        >
          <p>Update Flag #{tokenId}:</p>
          <p className="text">
            Grab Stars Background Source Images Url: {starsImageTitle}
          </p>
          <FormUI
            setArrayImages={setStarsImages}
            setImageTitle={setStarsImageTitle}
            setSubmitted={setStarsLinkSubmitted}
            setIsLoading={setIsStarsLoading}
          />
          <br />
          <p className="text">
            Stars Background Image Title: {starsImageTitle}
          </p>
          <ImageArray
            selection={starsImageUrl}
            setImageSelection={setStarsImageUrl}
            setSummarySelection={setStarsImageSummary}
            isLoading={isStarsLoading}
            imgs={starsImages}
            submitted={starsLinkSubmitted}
            width={dimensions.width * 0.4}
          />
          <div
            style={{
              display: dimensions.width > DESKTOP_MIN ? "flex" : "block",
            }}
          >
            <div style={{ flex: "1" }}>
              <p className="text">Selected Stars Background Image Url:</p>
              <p style={{ fontSize: "10px", color: "#0c0" }}>{starsImageUrl}</p>
            </div>
            <div style={{ flex: "1" }}>
              <p className="text">Selected Stars Background Image Summary:</p>
              <p style={{ fontSize: "10px", color: "#0c0" }}>
                {starsImageSummary}
              </p>
            </div>
          </div>
          <p className="text">
            Grab Stripes Background Source Images Url: {starsImageTitle}
          </p>
          <FormUI
            setArrayImages={setStripesImages}
            setImageTitle={setStripesImageTitle}
            setSubmitted={setStripesLinkSubmitted}
            setIsLoading={setIsStripesLoading}
          />
          <br />
          <p className="text">
            Stripes Background Image Title: {stripesImageTitle}
          </p>
          <ImageArray
            selection={stripesImageUrl}
            setImageSelection={setStripesImageUrl}
            setSummarySelection={setStripesImageSummary}
            isLoading={isStripesLoading}
            imgs={stripesImages}
            submitted={stripesLinkSubmitted}
            width={dimensions.width * 0.4}
          />
          <div
            style={{
              display: dimensions.width > DESKTOP_MIN ? "flex" : "block",
            }}
          >
            <div style={{ flex: "1" }}>
              <p className="text">Selected Stripes Background Image Url:</p>
              <p style={{ fontSize: "10px", color: "#0c0" }}>
                {stripesImageUrl}
              </p>
            </div>
            <div style={{ flex: "1" }}>
              <p className="text">Selected Stripes Background Image Summary:</p>
              <p style={{ fontSize: "10px", color: "#0c0" }}>
                {stripesImageSummary}
              </p>
            </div>
          </div>

          <Flag
            width={Math.min(dimensions.width * 0.6, 300)}
            starsBackgroundImage={starsImageUrl}
            stripesBackgroundImage={stripesImageUrl}
            borderColor="#222"
          />
          <br />
          <label
            style={{
              fontSize: "10px",
              color: !!description ? "#0c0" : "#ff4444",
            }}
          >
            New Flag Description:
          </label>
          <br />
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
            {isUpdateLoading && <LoadingObject size=".5" />}
          </div>
          <button
            style={{ width: "200px", fontSize: "15px" }}
            className={isValid ? "button button1" : "button disabled"}
            onClick={() => {
              handleUpdate();
            }}
          >
            UPDATE FLAG 🪡
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateFlagForm;
