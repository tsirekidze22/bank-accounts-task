export const AccountsArr = [
  {
    owner: "John Doe",
    name: "Personal Mastercard",
    iban: "GE89370400440532013000",
    balance: 1500.0,
    currency: "EUR",
    expires: "12/24",
    cardType: "Mastercard",
  },
  {
    owner: "John Doe",
    name: "Savings Account",
    iban: "GE89370400440532013002",
    balance: 3000.0,
    currency: "EUR",
    expires: "01/26",
    cardType: "Mastercard",
  },
  {
    owner: "Jane Smith",
    name: "Business Mastercard",
    iban: "GE89370400440532013001",
    balance: 2500.0,
    currency: "EUR",
    expires: "11/25",
    cardType: "Mastercard",
  },
];

export const AccountsTabs = [
  { key: "all", label: "All Accounts" },
  { key: "my accounts", label: "My Accounts" },
  { key: "other", label: "Other" },
];

export const TransactionTabs = [
  { key: "withdraw", label: "Withdraw" },
  { key: "deposit", label: "Deposit" },
  { key: "transfer", label: "Transfer" },
];
