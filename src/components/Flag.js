import React from "react";
import stars from "../images/stars.png";
import stripes from "../images/stripes.png";

const Flag = ({
  width,
  height = width * 0.63,
  starsBackgroundImage,
  stripesBackgroundImage,
  borderColor,
}) => {
  const stripesstyle = {
    backgroundImage: `url(${stripesBackgroundImage})`,
    backgroundSize: `${width * 0.92}px ${height * 0.88}px`,
    backgroundPosition: `${width * 0.05}px ${height * 0.07}px`,
    backgroundRepeat: "no-repeat",
    width: width,
    height: height,
  };

  const borderstyle = {
    backgroundColor: borderColor || "#ffffff",
    width: width * 0.478,
    height: height * 0.548,
    marginLeft: -width,
    marginTop: 0,
  };

  const starstyle = {
    backgroundImage: `url(${starsBackgroundImage})`,
    backgroundSize: `${width * 0.43}px ${height * 0.47}px`,
    backgroundPosition: `${width * 0.026}px ${height * 0.04}px`,
    backgroundRepeat: "no-repeat",
    width: width * 0.478,
    height: height * 0.548,
    marginLeft: -0.479 * width,
    marginTop: 0,
  };

  const flagstyle = {
    display: "flex",
    marginLeft: `calc(50% - ${width / 2.002}px)`,
  };

  return (
    <div style={flagstyle}>
      <div style={stripesstyle}>
        <img src={stripes} alt={"stripes"} width={"100%"} height={"100%"} />
      </div>
      <div style={borderstyle} />
      <div style={starstyle}>
        <img src={stars} alt={"stars"} width={"100%"} height={"100%"} />
      </div>
    </div>
  );
};

export default Flag;
