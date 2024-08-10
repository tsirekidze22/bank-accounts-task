import React, { useState } from "react";

interface Account {
  iban: string;
  balance: number;
}

interface PaymentFormProps {
  type: string;
  accounts?: Account[];
  updateBalance?: (iban: string, newBalance: number) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  type = "withdraw",
  accounts = [],
  updateBalance = () => {},
}) => {
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [currency, setCurrency] = useState("EUR");

  const handleTransaction = () => {
    if (type === "withdraw") {
      const account = accounts.find((acc) => acc.iban === iban);
      if (account) {
        if (account.balance >= amount) {
          updateBalance(iban, account.balance - amount);
          alert(`€${amount} withdrawn successfully!`);
        } else {
          alert("Insufficient funds.");
        }
      } else {
        alert("Account not found.");
      }
    } else if (type === "deposit") {
      alert(`€${amount} deposited successfully!`);
    } else if (type === "transfer") {
      alert(`€${amount} transferred successfully!`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "iban") {
      setIban(value);
    } else if (name === "amount") {
      setAmount(parseFloat(value));
    }
  };

  return (
    <section className="payment-form container d-flex flex-column align-items-center gap-16">
      <h3 className="fs-24">
        {type.charAt(0).toUpperCase() + type.slice(1)} Money
      </h3>

      <div className="form-group">
        <label htmlFor="iban" className="fs-16">
          IBAN
        </label>
        <input
          type="text"
          id="iban"
          name="iban"
          value={iban}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Enter IBAN"
        />
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
          placeholder="Enter amount"
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
  );
};

export default PaymentForm;
