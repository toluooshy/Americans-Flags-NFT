import React from "react";
import loading from "../images/loading.gif";

const LoadingObject = ({ size }) => {
  const style = { margin: "auto", filter: "brightness(0)" };
  return (
    <>
      <img
        style={style}
        src={loading}
        alt={"loading"}
        width={size || "33%"}
        height={size || "33%"}
      />
    </>
  );
};

export default LoadingObject;
