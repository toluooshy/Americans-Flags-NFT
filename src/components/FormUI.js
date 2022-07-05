import React, { useState } from "react";
import axios from "axios";

const FormUI = ({ setArrayImages, setSubmitted }) => {
  const [payload, setPayload] = useState("");

  const handleSubmit = async (e) => {
    setSubmitted(true);
    e.preventDefault();
    alert(`Submitting URL ${payload}`);

    await axios
      .get(`https://image-grabber-api.herokuapp.com/grab/${payload}`)
      .then((response) => {
        setArrayImages([]);
        setArrayImages(response.data);
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
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default FormUI;
