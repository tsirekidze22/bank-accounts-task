import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TransactionItem from "./TransactionItem";
import Tabs from "../Tabs/Tabs";
import { TransactionTabs } from "../../constants";

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
  const [activeTabs, setActiveTabs] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleTabClick = (tabKey: string) => {
    setActiveTabs((prevActiveTabs) => {
      const updatedTabs = prevActiveTabs.includes(tabKey)
        ? prevActiveTabs.filter((key) => key !== tabKey)
        : [...prevActiveTabs, tabKey];
      return updatedTabs;
    });
    setCurrentPage(1);
  };

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (activeTabs.length > 0) {
      filtered = filtered.filter((transaction) =>
        activeTabs.includes(transaction.transaction_type)
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(
        (transaction) =>
          new Date(transaction.date) >= (startDate || new Date(0)) &&
          new Date(transaction.date) <= (endDate || new Date())
      );
    }

    return filtered;
  }, [transactions, activeTabs, startDate, endDate]);

  const sortedTransactions = useMemo(() => {
    const sorted = [...filteredTransactions];
    sorted.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
    return sorted;
  }, [filteredTransactions, sortOrder]);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const currentTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedTransactions.slice(start, end);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="container mb-5 pb-5">
      <div
        className="d-flex mb-4 align-items-center justify-content-between flex-wrap"
        style={{ rowGap: 12 }}
      >
        <h3 className="fs-28">My Transactions</h3>

        <div className="d-flex horizontal-filters align-items-start flex-wrap">
          <div className="date-filters d-flex align-items-center gap-8">
            <label className="date-label">
              <span className="icon">&#128197;</span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Start Date"
                className="date-picker"
              />
            </label>
            <label className="date-label">
              <span className="icon">&#128197;</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="End Date"
                className="date-picker"
              />
            </label>
          </div>
          <Tabs
            tabs={TransactionTabs}
            activeTab={activeTabs}
            onTabClick={handleTabClick}
            isBoxShape={true}
          />

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
      </div>
      {currentTransactions.length > 0 ? (
        <>
          <ul className="transactions">
            {currentTransactions.map((transaction, index) => (
              <TransactionItem transaction={transaction} key={index} />
            ))}
          </ul>
          <div className="pagination mt-4">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="current">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </>
      ) : (
        <h3>You have no transactions yet...</h3>
      )}
    </section>
  );
};

export default TransactionsList;
