import React, { useState } from "react";
import LoadingObject from "./LoadingObject";

const ImageArray = ({
  setImageSelection,
  setSummarySelection,
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
        overflowX: "auto",
        whiteSpace: "nowrap",
        width: width || "100%",
        margin: "auto",
      }}
    >
      {isLoading ? (
        <LoadingObject />
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
              <div>
                <p
                  style={{
                    color: "#ffffff",
                    width: "auto",
                    fontSize: "50%",
                    inlineSize: "min-content",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    hyphens: "manual",
                    padding: "0px 12px",
                  }}
                >
                  {img[1] || `\b`}
                </p>
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
