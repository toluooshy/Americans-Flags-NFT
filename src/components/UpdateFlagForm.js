import React, { useState } from "react";
import axios from "axios";
import { TRUE_HEIGHT } from "../utils/Constants";

const UpdateFlagForm = ({
  width,
  height,
  top,
  contract,
  account,
  dimensions,
  tokenId,
}) => {
  const [starsImageUrl, setStarsImageUrl] = useState("");
  const [stripesImageUrl, setStripesImageUrl] = useState("");
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
        style={{ top: "0px", left: "0px" }}
        onClick={() => {
          setVisibility(!visibility);
        }}
      >
        {!!visibility ? ">" : "^"}
      </button>

      {!!visibility && (
        <div style={{ textAlign: "center" }}>
          <h4>Update Flag #{tokenId}:</h4>
          <label
            style={{
              fontSize: "12px",
              color: !!starsImageUrl ? "#060" : "#b00",
            }}
          >
            Stars URL:
          </label>
          <br />
          <input
            className="textInput"
            type="url"
            value={starsImageUrl}
            onChange={(event) => setStarsImageUrl(event.target.value)}
          />
          <br />
          <br />
          <label
            style={{
              fontSize: "12px",
              color: !!stripesImageUrl ? "#060" : "#b00",
            }}
          >
            Stripes URL:
          </label>
          <br />
          <input
            className="textInput"
            type="url"
            value={stripesImageUrl}
            onChange={(event) => setStripesImageUrl(event.target.value)}
          />
          <br />
          <br />
          <button
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
