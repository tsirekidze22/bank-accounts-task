import React, { useState } from "react";
import AccountsList from "./components/Accounts/AccountsList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { AccountsArr } from "./constants";
import TransactionsList from "./components/Transactions/TransactionsList";

interface Transaction {
  date: Date;
  amount: number;
  balance: number;
  iban: string;
  owner: string;
  name: string;
  transaction_type: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransaction = (transaction: Transaction) => {
    if (
      AccountsArr.find((account) => account.iban === transaction.iban)
        ?.owner === "John Doe"
    ) {
      setTransactions((prevTransactions) => [transaction, ...prevTransactions]);
    }
  };

  return (
    <>
      <Header />
      <AccountsList onTransaction={handleTransaction} accounts={AccountsArr} />
      <TransactionsList transactions={transactions} />
      <Footer />
    </>
  );
}

export default App;
