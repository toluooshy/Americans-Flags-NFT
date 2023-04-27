import React, { useCallback } from "react";
import stars from "../images/stars.png";
import stripes from "../images/stripes.png";
import { toPng } from "html-to-image";

const Flag = ({
  width,
  height = width * 0.63,
  starsBackgroundImage,
  stripesBackgroundImage,
  borderColor = "#000000",
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
    backgroundColor: borderColor || "rgba(0,0,0,0)",
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
    maxWidth: width,
    backgroundColor: borderColor,
  };

  const ref = React.useRef();

  const downloadFlag = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `AFN-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div>
      <div style={flagstyle} ref={ref}>
        <div style={stripesstyle}>
          <img
            src={stripes}
            alt={"stripes"}
            style={{ position: "relative", left: ".5px", top: "0.5px" }}
            width={"100%"}
            height={"99%"}
          />
        </div>
        <div style={borderstyle} />
        <div style={starstyle}>
          <img
            src={stars}
            alt={"stars"}
            style={{ position: "relative", left: ".5px", top: "0.5px" }}
            width={"100%"}
            height={"99%"}
          />
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <button className="button button2" onClick={downloadFlag}>
          Download Flag 💾
        </button>
      </div>
    </div>
  );
};

export default Flag;
