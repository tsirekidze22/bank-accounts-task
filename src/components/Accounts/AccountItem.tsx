import React from "react";

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
  const formatBalance = (balance: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account.iban).then(() => {
      alert("IBAN copied to clipboard!");
    });
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
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={copyToClipboard}
        >
          <img
            src="/assets/icons/copy-icon.svg"
            alt="copy"
            className="copy-icon"
          />
        </button>
      </div>
      <h4 className="fs-14 mt-4 mb-3">Account Owner</h4>
      <h3>{account.owner}</h3>
    </div>
  );
};

export default AccountItem;
