import React, { useState } from "react";

const ImageArray = ({ setSelection, imgs, submitted }) => {
  const [selectedIndex, setSelectedIndex] = useState("");

  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {imgs.length > 0
        ? imgs.map((img, index) => {
            return (
              <div
                key={index}
                style={{
                  margin: "auto",
                  backgroundColor: "rgba(0,0,0,.875)",
                  border:
                    index === selectedIndex ? "0.25rem solid #0c0" : "none",
                  borderRadius: index === selectedIndex ? "0px" : "0px",
                }}
                onClick={() => {
                  setSelectedIndex(index);
                  setSelection(img);
                }}
              >
                <img
                  src={img}
                  height="200px"
                  style={{ padding: "10px" }}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.style.display = "none";
                  }}
                />
              </div>
            );
          })
        : submitted && (
            <div style={{ color: "red", margin: "auto", textAlign: "center" }}>
              This website url is not compatible with our API
            </div>
          )}
    </div>
  );
};

export default ImageArray;
