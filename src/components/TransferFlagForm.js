import React, { useState } from "react";

const TransferFlagForm = ({ contract, wallet, tokenId, getTokens }) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [visibility, setVisibility] = useState(false);

  const handleTransfer = async () => {
    await contract.methods
      .safeTransferFrom(wallet, recipientAddress, tokenId)
      .send({ from: wallet }, async (err, res) => {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        if (!!res) {
          alert(`Transaction Received!\nTransaction Hash: ${res}`);
        }
      })
      .then(() => {
        getTokens(false);
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
        {!!visibility ? "^" : "TRANSFER FLAG >"}
      </button>

      {!!visibility && (
        <div
          style={{
            color: "#eeeeee",
            textAlign: "center",
            padding: "1px 20px",
            backgroundColor: "#222",
          }}
        >
          <p>Transfer Flag #{tokenId}:</p>
          <label
            style={{
              fontSize: "12px",
              color: !!recipientAddress ? "#060" : "#b00",
            }}
          >
            Recipient Address:
          </label>
          <br />
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
            style={{ width: "200px", fontSize: "15px" }}
            className="button button1"
            onClick={() => {
              handleTransfer();
            }}
          >
            TRANSFER FLAG 🛫
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferFlagForm;
