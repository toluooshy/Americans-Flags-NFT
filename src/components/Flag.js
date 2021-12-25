import React, { useState } from "react";
import stars from "../images/stars.png";
import stripes from "../images/stripes.png";

const Flag = ({ stripesBackgroundImage, starsBackgroundImage }) => {
  const stripesstyle = {
    backgroundColor: "#770000",
    backgroundImage: `url(${stripesBackgroundImage})`,
    backgroundSize: "125%",
    position: "absolute",
    width: 2026 / 4,
    height: 1066 / 4,
    top: 15,
    left: 15,
  };

  const borderstyle = {
    backgroundColor: "#ffffff",
    position: "absolute",
    width: 811 / 4 + 1,
    height: 574 / 4 + 1,
    top: 15,
    left: 15,
  };

  const starstyle = {
    backgroundColor: "#000077",
    backgroundImage: `url(${starsBackgroundImage})`,
    backgroundSize: "125%",
    position: "absolute",
    width: 811 / 4,
    height: 574 / 4,
    top: 0,
    left: 0,
  };

  const flagstyle = {
    backgroundColor: "#000077",
    backgroundImage: `url(${starsBackgroundImage})`,
    width: "fit-content",
    height: 1066 / 4,
    margin: "auto",
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
