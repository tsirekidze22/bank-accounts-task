import React from "react";

interface TransactionTypeProps {
  transactionType: string;
}

const TransactionTypeBadge: React.FC<TransactionTypeProps> = ({
  transactionType,
}) => {
  return <p className={transactionType}>{transactionType}</p>;
};

export default TransactionTypeBadge;
