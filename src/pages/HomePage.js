"use es6";

import React, { useState } from "react";

const HomePage = ({ contract, wallet, dimensions }) => {
  const containerstyle = {
    maxWidth: "800px",
    margin: "auto",
  };
  return (
    <>
      <div style={containerstyle}>
        <h1>HOME</h1>

        <h3>What is Americans Flags NFT?</h3>
        <p>
          Americans Flags NFT is a spinoff initiative inspired by the Americans
          Flags project created by Tim Ferguson Sauder through his lab Return
          Design at Olin College. During the time between December 2021 through
          January 2023 web scraping algorithms and smart contracts were utilized
          to adapt the originally physical interactive experince into a digital
          one in where users too can create their own personal flags. This
          decentralized application (dapp) that enables users to mint
          non-fungible tokens (NFT's) in the shape of the United States flag to
          express what "America" means to them. More information regarding the
          original art project can be found at the link listed below.
        </p>
        <a href="https://www.americansflags.net/">
          https://www.americansflags.net/
        </a>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h3>The Vision:</h3>
        <p>
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

        <h3>Future Plans:</h3>
        <p>
          Although Americans Flags NFT takes inspiration from its namesake
          project, he hope is to expand this project beyond the United States
          and creaing templtes allowings citizens of the globe to express what
          their country means to them through the adaptation of their respective
          national flags.
        </p>
        <br />
        <br />
      </div>
    </>
  );
};

export default HomePage;
