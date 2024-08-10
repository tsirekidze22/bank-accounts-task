import React, { useState } from "react";
import { TransactionTabs } from "../../constants";
import PaymentForm from "../PaymentForm/PaymentForm";

interface Account {
  iban: string;
  balance: number;
}

interface PaymentSectionProps {
  accounts?: Account[];
  updateBalance?: (iban: string, newBalance: number) => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  accounts = [],
  updateBalance = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<string>("withdraw");

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <section className="container mb-5 pb-5">
      <div className="mt-5 mb-3 tabs gap-16 d-flex">
        {TransactionTabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="d-flex gap-16">
        <PaymentForm
          accounts={accounts}
          updateBalance={updateBalance}
          type="withdraw"
        />
        <PaymentForm
          accounts={accounts}
          updateBalance={updateBalance}
          type="deposit"
        />
        <PaymentForm
          accounts={accounts}
          updateBalance={updateBalance}
          type="transfer"
        />
      </div>
    </section>
  );
};

export default PaymentSection;
