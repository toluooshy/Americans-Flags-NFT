import React, { useState } from "react";
import axios from "axios";

const FormUI = ({ setArrayImages, setImageTitle, setSubmitted }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormUI;
