import React from "react";

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabKey: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="mt-5 mb-3 tabs gap-16 d-flex">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => onTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
