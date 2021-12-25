"use es6";

import React, { useState } from "react";
import FormUI from "../components/FormUI";
import Flag from "../components/Flag";

const MintPage = () => {
  const [stripesBackgroundImage, setStripesBackgroundImage] = useState();
  const [starsBackgroundImage, setStarsBackgroundImage] = useState();
  const updateBackground = (link, stripes) => {
    const Http = new XMLHttpRequest();
    const url = `https://image-grabber-api.herokuapp.com/url/${link}`;
    Http.open("GET", url);
    Http.send();

    if (stripes) {
      Http.onreadystatechange = (e) => {
        setStripesBackgroundImage(
          Http.responseText.split('"')[1].split("?")[0]
        );
      };
    } else {
      Http.onreadystatechange = (e) => {
        setStarsBackgroundImage(Http.responseText.split('"')[1].split("?")[0]);
      };
    }
  };
  return (
    <>
      <h1>MINT</h1>

      <div>
        <div
          style={{
            position: "relative",
            margin: "auto",
            left: "calc(50% - 266.5px)",
          }}
        >
          <Flag
            stripesBackgroundImage={stripesBackgroundImage}
            starsBackgroundImage={starsBackgroundImage}
          />
        </div>

        <div>
          <h3>Update stars background (ex: www.pbs.org):</h3>
          <FormUI
            submissionAction={(e) => {
              updateBackground(e, false);
            }}
          />

          <h3>Update stripes background (ex: www.npr.com):</h3>
          <FormUI
            submissionAction={(e) => {
              updateBackground(e, true);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MintPage;
