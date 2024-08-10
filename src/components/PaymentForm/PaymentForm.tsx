import React, { useState } from "react";

interface Account {
  iban: string;
  balance: number;
}

interface PaymentFormProps {
  type: "withdraw" | "deposit" | "transfer";
  accounts?: Account[];
  updateBalance?: (iban: string, newBalance: number) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  type = "withdraw",
  accounts = [],
  updateBalance = () => {},
}) => {
  const [fromIban, setFromIban] = useState("");
  const [toIban, setToIban] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("EUR");

  const handleTransaction = () => {
    if (type === "withdraw" || type === "deposit") {
      const account = accounts.find((acc) => acc.iban === fromIban);
      if (account) {
        if (type === "withdraw") {
          if (account.balance >= amount) {
            updateBalance(fromIban, account.balance - amount);
            alert(`€${amount} withdrawn successfully!`);
          } else {
            alert("Insufficient funds.");
          }
        } else if (type === "deposit") {
          updateBalance(fromIban, account.balance + amount);
          alert(`€${amount} deposited successfully!`);
        }
      } else {
        alert("Account not found.");
      }
    } else if (type === "transfer") {
      const fromAccount = accounts.find((acc) => acc.iban === fromIban);
      const toAccount = accounts.find((acc) => acc.iban === toIban);
      if (fromAccount && toAccount) {
        if (fromAccount.balance >= amount) {
          updateBalance(fromIban, fromAccount.balance - amount);
          updateBalance(toIban, toAccount.balance + amount);
          alert(`€${amount} transferred successfully!`);
        } else {
          alert("Insufficient funds.");
        }
      } else {
        alert("One or both accounts not found.");
      }
    }

    setAmount(0);
    setFromIban("");
    setToIban("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "fromIban") {
      setFromIban(value);
    } else if (name === "toIban") {
      setToIban(value);
    } else if (name === "amount") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setAmount(numericValue ? parseFloat(numericValue) : 0);
    }
  };

  return (
    <section className="payment-form container">
      <h3 className="fs-24">
        {type.charAt(0).toUpperCase() + type.slice(1)} Money
      </h3>
      <section>
        <div className="form-group">
          {type === "transfer" ? (
            <>
              <label htmlFor="fromIban" className="fs-16">
                From
              </label>
              <input
                type="text"
                id="fromIban"
                name="fromIban"
                value={fromIban}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter source IBAN"
              />

              <label htmlFor="toIban" className="fs-16 mt-3">
                To
              </label>
              <input
                type="text"
                id="toIban"
                name="toIban"
                value={toIban}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter destination IBAN"
              />
            </>
          ) : (
            <>
              <label htmlFor="fromIban" className="fs-16">
                IBAN
              </label>
              <input
                type="text"
                id="fromIban"
                name="fromIban"
                value={fromIban}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter IBAN"
              />
            </>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount" className="fs-16">
            Amount ({currency})
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter amount???"
          />
        </div>

        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={handleTransaction}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </section>
    </section>
  );
};

export default PaymentForm;
