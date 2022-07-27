import React from "react";
import loading from "../images/loading.gif";

const LoadingObject = () => {
  const style = { margin: "auto", filter: "brightness(0)" };
  return (
    <>
      <img
        style={style}
        src={loading}
        alt={"loading"}
        width={"33%"}
        height={"33%"}
      />
    </>
  );
};

export default LoadingObject;
