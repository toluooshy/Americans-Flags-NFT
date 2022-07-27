import React, { useState } from "react";

const TransferFlagForm = ({ contract, account, tokenId }) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [visibility, setVisibility] = useState(false);

  const handleTransfer = async () => {
    await contract.methods
      .safeTransferFrom(account, recipientAddress, tokenId)
      .send({ from: account }, async (err, res) => {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        if (!!res) {
          alert(`Transaction Received!\nTransaction Hash: ${res}`);
        }
      });
  };

  return (
    <div style={{ lineHeight: "70%" }}>
      <button
        className="button button1"
        style={{ top: "0px", left: "0px" }}
        onClick={() => {
          setVisibility(!visibility);
        }}
      >
        {!!visibility ? ">" : "^"}
      </button>

      {!!visibility && (
        <div style={{ textAlign: "center" }}>
          <h4>Transfer Flag #{tokenId}:</h4>
          <label
            style={{
              fontSize: "12px",
              color: !!recipientAddress ? "#060" : "#b00",
            }}
          >
            Recipient Address:
          </label>
          <br />
          <input
            className="textInput"
            type="text"
            value={recipientAddress}
            onChange={(event) => setRecipientAddress(event.target.value)}
          />
          <br />
          <br />
          <button
            className="button button1"
            onClick={() => {
              handleTransfer();
            }}
          >
            TRANSFER FLAG
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferFlagForm;
