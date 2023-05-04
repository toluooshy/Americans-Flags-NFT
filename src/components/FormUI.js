import React, { useState } from "react";
import axios from "axios";

const FormUI = ({
  setArrayImages,
  setImageTitle,
  setSubmitted,
  setIsLoading,
}) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setSubmitted(true);
    e.preventDefault();
    alert(`Submitting URL ${url}`);
    const payload = {
      url: url,
    };

    await axios
      .post("https://image-grabber-api.herokuapp.com/grab", payload)
      .then((response) => {
        setArrayImages([]);
        setArrayImages(response.data.images);
        setImageTitle(response.data.title || "No Title");
      })
      .catch(() => {
        console.log("Something went wrong.");
      });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={{
          padding: "5px",
          margin: "0px 10px 0px 0px",
          minWidth: "200px",
          maxWidth: "300px",
        }}
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input className="button" type="submit" value="Submit" />
    </form>
  );
};

export default FormUI;
