import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCropper = ({ section = "stripes", url, cropData, setCropData }) => {
  const [image, setImage] = useState("");
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      console.log(cropData);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "400px",
        }}
      >
        <div>
          <Cropper
            aspectRatio={section === "stars" ? 430 / 297 : 920 / 552}
            src={`data:image/png;base64, ${url}`}
            background={false}
            responsive={true}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
        </div>
        <div>
          {
            <button
              className="button button2"
              style={{ margin: "3px 10px", minWidth: "100px" }}
              onClick={getCropData}
            >
              Crop Image ✂️
            </button>
          }
        </div>
      </div>
      {cropData && (
        <div style={{ display: "block" }}>
          <p>Cropped Image:</p>
          {!!cropData ? (
            <img
              src={cropData}
              alt="Cropped Image"
              style={{ maxWidth: "100%" }}
            />
          ) : (
            <p>Select an image from above first that you would like to crop.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
