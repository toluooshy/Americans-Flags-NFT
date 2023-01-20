import React from "react";
import loading from "../images/loading.gif";

const LoadingObject = ({ size = 0.33 }) => {
  const style = {
    width: `${300 * size}px`,
    height: `${200 * size}px`,
    margin: "auto",
    overflow: "hidden",
    filter: "brightness(0%)",
  };
  return (
    <div style={style}>
      <img
        style={{
          margin: `${-230 * size}px 0 0 ${-345 * size}px`,
          width: `${990 * size}px`,
          height: `${660 * size}px`,
        }}
        src={loading}
        alt={"loading"}
      />
    </div>
  );
};

export default LoadingObject;
