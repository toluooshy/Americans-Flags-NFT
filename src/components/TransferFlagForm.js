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
        className="button"
        style={{ top: "0px", left: "0px" }}
        onClick={() => {
          setVisibility(!visibility);
        }}
      >
        {!!visibility ? "^" : "Transfer Flag >"}
      </button>

      {!!visibility && (
        <div
          style={{
            color: "#eeeeee",
            textAlign: "left",
            padding: "1px 20px",
            backgroundColor: "#222",
          }}
        >
          <p style={{ fontSize: "30px" }}>Transfer Flag #{tokenId}:</p>
          <br />
          <div style={{ padding: "0px 10px 0px 0px" }}>
            <p
              style={{
                margin: "0px 0px 11px 0px",
                fontSize: "13px",
                color: !!recipientAddress ? "#0c0" : "#ff4444",
              }}
            >
              Recipient Address*
            </p>
            <input
              className="textInput"
              style={{
                padding: "5px",
                margin: "0px 10px 0px 0px",
                width: "100%",
              }}
              type="text"
              value={recipientAddress}
              onChange={(event) => setRecipientAddress(event.target.value)}
            />
          </div>
          <br />
          <br />
          <button
            className="button"
            style={{ width: "250px", fontSize: "20px" }}
            onClick={() => {
              handleTransfer();
            }}
          >
            Transfer
          </button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default TransferFlagForm;
