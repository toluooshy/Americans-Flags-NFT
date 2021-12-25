import React, { useState } from "react";

const FormUI = ({ submissionAction }) => {
  const [payload, setPayload] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitting URL ${payload}`);
    submissionAction(payload);
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
