import React, { useState, useMemo } from "react";
import TransactionItem from "./TransactionItem";

interface Transaction {
  date: Date;
  amount: number;
  balance: number;
  iban: string;
  name: string;
  transaction_type: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedTransactions = useMemo(() => {
    const sorted = [...transactions];
    sorted.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    return sorted;
  }, [transactions, sortOrder]);

  return (
    <section className="container mb-5 pb-5">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="fs-28 mb-4">My Transactions</h3>
        <div className="sort-dropdown">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Sort by Date (Ascending)</option>
            <option value="desc">Sort by Date (Descending)</option>
          </select>
          <span className="dropdown-icon">&#9662;</span>
        </div>
      </div>
      {sortedTransactions.length > 0 ? (
        <ul className="transactions p-4">
          {sortedTransactions.map((transaction, index) => (
            <TransactionItem transaction={transaction} key={index} />
          ))}
        </ul>
      ) : (
        <h3>You have no transactions yet...</h3>
      )}
    </section>
  );
};

export default TransactionsList;
