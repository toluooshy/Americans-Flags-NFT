"use es6";

import React from "react";
import { Link } from "react-router-dom";
import Flag from "../components/Flag";
import FormUI from "../components/FormUI";

const ViewPage = () => {
  return (
    <>
      <h1>VIEW</h1>
      <h3>Search for other NFT's by address:</h3>
      <FormUI />
      <h3>NFT's belonging to this address:</h3>
      <div>
        <div
          style={{
            position: "relative",
            margin: "auto",
            left: "calc(50% - 266.5px)",
          }}
        >
          <div style={{ position: "relative" }}>
            <Flag
              stripesBackgroundImage={
                "https://www.goworldtravel.com/wp-content/uploads/2020/03/travel-landscapes-usa.jpg"
              }
              starsBackgroundImage={
                "https://pbs.twimg.com/media/FDUwpYMXEAAkIgO.jpg"
              }
            />
            <br />
            <br />
            <button>Burn</button>
          </div>
          <br />
          <br />
          <br />
          <div style={{ position: "relative" }}>
            <Flag
              stripesBackgroundImage={
                "https://cff2.earth.com/uploads/2019/08/20134902/Irregular-Sonoran-monsoon-highlights-danger-of-always-blaming-climate-change.jpg"
              }
              starsBackgroundImage={
                "https://pixfeeds.com/images/earth-science/biomes/1280-515891664-pools-in-the-tundra-mountains.jpg"
              }
            />
            <br />
            <br />
            <button>Burn</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPage;
