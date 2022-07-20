import React, { useState } from "react";
import stars from "../images/stars.png";
import stripes from "../images/stripes.png";

const Flag = ({
  width,
  height = (3 * width) / 5,
  starsBackgroundImage,
  stripesBackgroundImage,
}) => {
  const stripesstyle = {
    backgroundColor: "#770000",
    backgroundImage: `url(${stripesBackgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: width,
    height: height,
  };

  const borderstyle = {
    backgroundColor: "#ffffff",
    width: width / 2,
    height: (height * 7) / 13 + 1,
    marginLeft: -width,
  };

  const starstyle = {
    backgroundColor: "#000077",
    backgroundImage: `url(${starsBackgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: width / 2,
    height: (height * 7) / 13,
    marginLeft: -width / 2 - height / 13,
    marginTop: -height / 13,
  };

  const flagstyle = {
    display: "flex",
    marginLeft: `calc(50% - ${width / 2 - 6.5}px)`,
  };

  return (
    <div style={flagstyle}>
      <div style={stripesstyle}>
        <img src={stripes} alt={"stripes"} width={"100%"} height={"100%"} />
      </div>
      <div style={borderstyle}>
        <img src={stars} alt={"border"} width={"100%"} height={"100%"} />
      </div>
      <div style={starstyle}>
        <img src={stars} alt={"stars"} width={"100%"} height={"100%"} />
      </div>
    </div>
  );
};

export default Flag;
