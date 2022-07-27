import React, { useState } from "react";
import FormUI from "../components/FormUI";
import Flag from "../components/Flag";
import ImageArray from "../components/ImageArray";
import axios from "axios";
import { DESKTOP_MIN } from "../utils/Constants";

const UpdateFlagForm = ({ contract, account, tokenId, dimensions }) => {
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
  const [tokenDescription, setTokenDescription] = useState("");
  const [tokenMetadataURI, setTokenMetadataURI] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const handleUpdate = async () => {
    await contract.methods.flags(tokenId).call(async (err, res) => {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      const changesLeft = Number(res.changesLeft);

      const payload = {
        id: tokenId,
        stars:
          starsImageUrl.length > 0
            ? starsImageUrl
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png",
        stripes:
          stripesImageUrl.length > 0
            ? stripesImageUrl
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1200px-HD_transparent_picture.png",
        changesLeft: changesLeft,
      };
      await axios
        .post("https://flag-generator-api.herokuapp.com/generate", payload)
        .then((response) => {
          setTokenMetadataURI(response.data);
        })
        .catch(() => {
          console.log("Something went wrong.");
        });
      if (!!tokenMetadataURI) {
        await contract.methods
          .setFlagData(
            tokenId,
            starsImageUrl,
            stripesImageUrl,
            tokenMetadataURI
          )
          .send({ from: account }, async (err, res) => {
            if (err) {
              console.log("An error occured", err);
              return;
            }
            alert(`Transaction Received!\nTransaction Hash: ${res}`);
          });
      } else {
        alert("Error processing flag metadata. Please try again.");
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
        {!!visibility ? ">" : "^"}
      </button>

      {!!visibility && (
        <div
          style={{
            color: "#eeeeee",
            textAlign: "center",
            padding: "1px",
            backgroundColor: "#222",
          }}
        >
          <h5>Update Flag #{tokenId}:</h5>

          <FormUI
            setArrayImages={setStarsImages}
            setImageTitle={setStarsImageTitle}
            setSubmitted={setStarsLinkSubmitted}
            setIsLoading={setIsStarsLoading}
          />
          <br />
          <h6>Stars Background Image Title: {starsImageTitle}</h6>
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
              <h6>Selected Stars Background Image Url:</h6>
              <p style={{ fontSize: "8px", color: "#0c0" }}>{starsImageUrl}</p>
            </div>
            <div style={{ flex: "1" }}>
              <h6>Selected Stars Background Image Summary:</h6>
              <p style={{ fontSize: "8px", color: "#0c0" }}>
                {starsImageSummary}
              </p>
            </div>
          </div>

          <FormUI
            setArrayImages={setStripesImages}
            setImageTitle={setStripesImageTitle}
            setSubmitted={setStripesLinkSubmitted}
            setIsLoading={setIsStripesLoading}
          />
          <br />
          <h6>Stripes Background Image Title: {stripesImageTitle}</h6>
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
              <h6>Selected Stripes Background Image Url:</h6>
              <p style={{ fontSize: "8px", color: "#0c0" }}>
                {stripesImageUrl}
              </p>
            </div>
            <div style={{ flex: "1" }}>
              <h6>Selected Stripes Background Image Summary:</h6>
              <p style={{ fontSize: "8px", color: "#0c0" }}>
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
          <br />
          <br />
          <br />
          <br />
          <label
            style={{
              fontSize: "12px",
              color: !!tokenDescription ? "#060" : "#b00",
            }}
          >
            New Flag Description:
          </label>
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
          <button
            className="button button1"
            onClick={() => {
              handleUpdate();
            }}
          >
            UPDATE FLAG
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateFlagForm;
