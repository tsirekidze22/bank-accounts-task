import React, { useState } from "react";

interface Account {
  name: string;
  iban: string;
  balance: number;
  expires: string;
  cardType: string;
  owner: string;
  currency: string;
}

const AccountItem = ({ account }: { account: Account }) => {
  const [message, setMessage] = useState("");

  const formatBalance = (balance: number) => {
    return balance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCopyIban = () => {
    navigator.clipboard.writeText(account.iban);
    setMessage("IBAN copied to clipboard!");

    setTimeout(() => {
      setMessage(""); 
    }, 2000);
  };

  return (
    <div className="account-item p-4">
      <h3 className="fs-20">{account.name}</h3>
      <h4 className="mt-4 mb-3">Available Balance</h4>
      <h2 className="fs-28 ">
        {account.currency} {formatBalance(account.balance)}
      </h2>
      <div className="divider mt-4 mb-4" />
      <h4 className="fs-14 mb-3">IBAN</h4>
      <div className="iban-section d-flex align-items-center justify-content-between">
        <h3>{account.iban}</h3>
        <button type="button" className="copy-btn" onClick={handleCopyIban}>
          <img
            src="/assets/icons/copy-icon.svg"
            alt="copy"
            className="copy-icon"
          />
          {message !== "" && <p className="copy-message">{message}</p>}
        </button>
      </div>
      <h4 className="fs-14 mt-4 mb-3">Account Owner</h4>
      <h3>{account.owner}</h3>
    </div>
  );
};

export default AccountItem;
