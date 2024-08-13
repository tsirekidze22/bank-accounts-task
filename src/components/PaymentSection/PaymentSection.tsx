import React, { useState, useEffect } from "react";
import { TransactionTabs } from "../../constants";
import PaymentForm from "../PaymentForm/PaymentForm";
import Tabs from "../Tabs/Tabs";

interface Account {
  iban: string;
  balance: number;
  name: string;
}

interface PaymentSectionProps {
  accounts?: Account[];
  updateBalance?: (iban: string, newBalance: number) => void;
  onTransaction?: any;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  accounts = [],
  updateBalance = () => {},
  onTransaction = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<string>("withdraw");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="container mb-5 pb-5 mt-5">
      <div className="tabs mt-5 gap-16 d-flex d-md-none">
        <Tabs
          tabs={TransactionTabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </div>
      <div className="d-flex gap-16 mt-3 flex-wrap">
        {isMobile ? (
          <PaymentForm
            accounts={accounts}
            updateBalance={updateBalance}
            type={activeTab}
            onTransaction={onTransaction}
          />
        ) : (
          TransactionTabs.map((tab) => (
            <PaymentForm
              key={tab.key}
              accounts={accounts}
              updateBalance={updateBalance}
              type={tab.key}
              onTransaction={onTransaction}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default PaymentSection;
