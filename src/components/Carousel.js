"use es6";

import React, { useState, useEffect } from "react";

const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const switchSlide = (n) => {
    if ((n > 0 && slide < data.length - 1) || (n < 0 && slide > 0)) {
      setSlide(slide + n);
    }
    if (n > 0 && slide >= data.length - 1) {
      setSlide(0);
    }
    if (n < 0 && slide <= 0) {
      setSlide(data.length - 1);
    }
  };

  useEffect(() => {
    let n = 0;
    const interval = setInterval(() => {
      n >= data.length - 1 ? (n = 0) : n++;
      setSlide(n);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ color: "#ffffff" }}>
      <div>
        {data.map((content, index) => {
          if (slide === slide) {
            return (
              <span key={index}>
                {index === slide && (
                  <div key={index} style={{ width: "100%" }}>
                    {content}
                  </div>
                )}
              </span>
            );
          }
        })}
      </div>
      <div style={{ flex: "1", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              margin: "10px 20px",
            }}
          >
            <button
              className="carousel"
              onClick={() => {
                switchSlide(-1);
              }}
            >
              {"<"}
            </button>
          </div>

          <div style={{ display: "flex", margin: "0px 0px 0px -12.5px" }}>
            {data.map((dot, index) => {
              return (
                <span
                  className="dots"
                  style={{
                    border: "solid 2px #ffffff",
                    backgroundColor: slide === index ? "#ffffff" : "#000000",
                  }}
                  key={index}
                  onClick={() => {
                    setSlide(index);
                  }}
                />
              );
            })}
          </div>
          <div
            style={{
              margin: "10px 20px",
            }}
          >
            <button
              className="carousel"
              onClick={() => {
                switchSlide(1);
              }}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
