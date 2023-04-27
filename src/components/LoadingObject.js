import React from "react";
import loading from "../images/loading.gif";

const LoadingObject = ({ size = 0.33 }) => {
  const style = {
    overflow: "hidden",
    transform: "rotate(45deg)",
    filter: "brightness(1000%)",
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
