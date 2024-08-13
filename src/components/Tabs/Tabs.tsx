import React from "react";

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string | any[];
  onTabClick: (tabKey: string) => void;
  isBoxShape?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabClick,
  isBoxShape,
}) => {
  return (
    <div className="tabs gap-8 d-flex">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${isBoxShape ? "box-shape" : ""} ${
            activeTab.includes(tab.key) ? "active" : ""
          }`}
          onClick={() => onTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
