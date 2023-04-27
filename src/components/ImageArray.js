import React, { useState } from "react";
import LoadingObject from "./LoadingObject";

const ImageArray = ({
  setImageSelection,
  setSummarySelection,
  setBase64Selection,
  isLoading,
  imgs,
  submitted,
  width,
}) => {
  const [selectedIndex, setSelectedIndex] = useState("");

  return (
    <div
      style={{
        display: "flex",
        overflow: "auto",
        width: width || "100%",
        margin: "auto",
      }}
    >
      {isLoading ? (
        <div>
          <br />
          <br />
          <br />
          <br />
          <LoadingObject />
        </div>
      ) : imgs.length > 0 ? (
        imgs.map((img, index) => {
          return (
            <div
              key={index}
              style={{
                margin: "auto",
                backgroundColor: "rgba(0,0,0,.875)",
                border: index === selectedIndex ? "0.25rem solid #0c0" : "none",
                borderRadius: index === selectedIndex ? "0px" : "0px",
              }}
              onClick={() => {
                setSelectedIndex(index);
                setImageSelection(img[0]);
                setSummarySelection(img[1]);
                setBase64Selection(img[2]);
              }}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                  overflowWrap: "break-word",
                  height: "250px",
                  margin: "fit-content",
                  textOverflow: "ellipsis",
                }}
              >
                <img
                  src={img[0]}
                  height={`${width * 0.15 || 200}px`}
                  style={{ padding: "10px" }}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.style.display = "none";
                  }}
                />

                <h5
                  style={{
                    width: "100%",
                    color: "#ffffff",
                    fontSize: "75%",
                    margin: "auto",
                    padding: "0px 10px",
                  }}
                >
                  {img[1] || `(No Title)`}
                </h5>
                <br />
              </div>
            </div>
          );
        })
      ) : (
        submitted && (
          <div style={{ color: "red", margin: "auto", textAlign: "center" }}>
            This website url is not compatible with our API
          </div>
        )
      )}
    </div>
  );
};

export default ImageArray;
