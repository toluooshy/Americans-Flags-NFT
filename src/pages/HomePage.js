"use es6";

import React from "react";
import flag from "../images/flag.png";
import nft from "../images/nft.png";
import showcase from "../images/showcase.jpg";
import polygonscan from "../images/polygonscan.png";
import screenshot from "../images/screenshot.png";
import Carousel from "../components/Carousel";

const HomePage = ({ contract, wallet, dimensions }) => {
  const containerstyle = {
    maxWidth: "95%",
    padding: "50px",
    textAlign: "left",
    backgroundColor: "#000000",
    color: "#ffffff",
    lineHeight: "150%",
  };

  return (
    <div
      style={{
        backgroundColor: "#000000",
        minHeight: `${dimensions.height + 100}px`,
      }}
    >
      <div style={containerstyle}>
        <Carousel
          data={[
            <img
              src={flag}
              alt={"Original flag inspiration."}
              width={"100%"}
              height={"99%"}
            />,
            <img
              src={nft}
              alt={"NFT flag adaptation."}
              width={"100%"}
              height={"99%"}
            />,
            <img
              src={showcase}
              alt={
                "Tim Sauder showcasing the original Americans Flags collection."
              }
              width={"100%"}
              height={"99%"}
            />,
            <img
              src={polygonscan}
              alt={"A screenshot of the NFT smart contract on Polygonscan."}
              width={"100%"}
              height={"99%"}
            />,
            <img
              src={screenshot}
              alt={"A screenshot of the react webapp code."}
              width={"100%"}
              height={"99%"}
            />,
          ]}
        />

        <br />
        <br />
        <br />
        <br />

        <p style={{ fontSize: "25px" }}>Stage 1 - Sourcing Inspiration</p>
        <p style={{ color: "#cccccc", fontSize: "16px", lineHeight: "175%" }}>
          Americans Flags NFT is a spinoff initiative inspired by the Americans
          Flags project created by Tim Ferguson Sauder through his lab Return
          Design at Olin College. During the time between December 2021 through
          January 2023 web scraping algorithms and smart contracts were utilized
          to adapt the originally physical interactive experince into a digital
          one in where users too can create their own personal flags. This
          decentralized application (dapp) enables users to mint non-fungible
          tokens (NFT's) in the shape of the United States flag to express what
          "America" means to them. All NFT's are free + gas to mint and are
          compatible with any Polygon-supported platforms. More information
          regarding the original art project can be found at the link listed
          below:
        </p>
        <a style={{ color: "#aaccff" }} href="https://www.americansflags.net/">
          https://www.americansflags.net/
        </a>

        <br />
        <br />
        <br />
        <br />

        <p style={{ fontSize: "25px" }}>Stage 2 - The Vision</p>
        <p style={{ color: "#cccccc", fontSize: "16px", lineHeight: "175%" }}>
          Americans Flags is a project created by Tim Ferguson Sauder through
          his lab Return Design at Olin College. He is an artist, designer and
          associate professor in the practice of design at Olin College of
          Engineering. Artist Statement This body of work has been (and is
          being) created in response to an interaction I had with my students a
          couple years ago. It was the morning after an incredibly charged US
          election and my class was just starting. As soon as everyone showed up
          and grabbed a seat one of my students raised her hand and asked,
          "Since this is a communication course can we talk about how I'm
          supposed to communicate with my family about politics when I already
          know we don't agree? Especially about what happened last night?"" We
          talked that day about how difficult it is to be open to others' points
          of view while staying true to your own beliefs when those two things
          differ. We discussed how it was our responsibility to work to find
          ways to broaden our own perspectives and share with others what we
          see. This work is an exercise in exposing myself to other people's
          experiences in America. I'm exploring what this country means to them
          and deepening my own understanding of what America and its identity
          means to me.
        </p>

        <i>- Tim Ferguson Sauder</i>

        <br />
        <br />
        <br />
        <br />

        <p style={{ fontSize: "25px" }}>Stage 3 - Future Plans</p>
        <p style={{ color: "#cccccc", fontSize: "16px", lineHeight: "175%" }}>
          Although Americans Flags NFT takes inspiration from its namesake
          project, he hope is to expand this project beyond the United States
          and creaing templtes allowings citizens of the globe to express what
          their country means to them through the adaptation of their respective
          national flags.
        </p>
        <br />
        <br />
      </div>
    </div>
  );
};

export default HomePage;
