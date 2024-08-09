import React from "react";
import AccountItem from "./AccountItem";

interface Account {
  name: string;
  iban: string;
  balance: number;
  expires: string;
  cardType: string;
  owner: string;
  currency: string;
}

const accounts: Account[] = [
  {
    owner: "John Doe",
    name: "Personal Mastercard",
    iban: "DE89370400440532013000",
    balance: 1500.0,
    currency: "EUR",
    expires: "12/24",
    cardType: "Mastercard",
  },
  {
    owner: "Jane Smith",
    name: "Business Mastercard",
    iban: "DE89370400440532013001",
    balance: 2500.0,
    currency: "EUR",
    expires: "11/25",
    cardType: "Mastercard",
  },
];

const AccountsList = () => {
  return (
    <section className="container d-flex justify-content-center gap-24 mt-5">
      {accounts.length > 0 &&
        accounts.map((account, index) => (
          <AccountItem key={index} account={account} />
        ))}
    </section>
  );
};

export default AccountsList;
