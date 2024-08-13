import { useState } from "react";
import AccountItem from "./AccountItem";
import PaymentSection from "../PaymentSection/PaymentSection";
import Tabs from "../Tabs/Tabs";
import { AccountsTabs } from "../../constants";

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
  const [activeTab, setActiveTab] = useState<string>("all");

  const updateBalance = (iban: string, newBalance: number) => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.iban === iban ? { ...account, balance: newBalance } : account
      )
    );
  };

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const filteredAccounts = accountsState.filter((account) => {
    if (activeTab === "all") return true;
    if (activeTab === "my accounts") return account.owner === "John Doe";
    if (activeTab === "other") return account.owner !== "John Doe";
    return true;
  });

  return (
    <>
      <section className="container  mt-5">
        <Tabs
          tabs={AccountsTabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
        <section className="d-flex justify-content-center gap-24 mt-5 flex-wrap">
          {filteredAccounts.length > 0 &&
            filteredAccounts.map((account, index) => (
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
