import { useState } from "react";
import AccountItem from "./AccountItem";
import { AccountsArr } from "../../constants";
import PaymentSection from "../PaymentSection/PaymentSection";

interface Account {
  name: string;
  iban: string;
  balance: number;
  expires: string;
  cardType: string;
  owner: string;
  currency: string;
}

const AccountsList = () => {
  const [accounts, setAccounts] = useState<Account[]>(AccountsArr);

  const updateBalance = (iban: string, newBalance: number) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.iban === iban ? { ...account, balance: newBalance } : account
      )
    );
  };

  return (
    <>
      <section className="container d-flex flex-column align-items-center gap-16 mt-5">
        <section className="container d-flex justify-content-center gap-24 mt-5">
          {accounts.length > 0 &&
            accounts.map((account, index) => (
              <AccountItem key={index} account={account} />
            ))}
        </section>
      </section>
      <PaymentSection accounts={accounts} updateBalance={updateBalance} />
    </>
  );
};

export default AccountsList;
