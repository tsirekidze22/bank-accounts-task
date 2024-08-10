import { useState } from "react";
import AccountItem from "./AccountItem";
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

interface Transaction {
  date: Date;
  amount: number;
  balance: number;
  iban: string;
  owner: string;
  name: string;
  transaction_type: string;
}

interface AccountsListProps {
  onTransaction: (transaction: Transaction) => void;
  accounts: Account[];
}

const AccountsList = ({ onTransaction, accounts }: AccountsListProps) => {
  const [accountsState, setAccounts] = useState<Account[]>(accounts);

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
          {accountsState.length > 0 &&
            accountsState.map((account, index) => (
              <AccountItem key={index} account={account} />
            ))}
        </section>
      </section>
      <PaymentSection
        accounts={accountsState}
        updateBalance={updateBalance}
        onTransaction={onTransaction}
      />
    </>
  );
};

export default AccountsList;
