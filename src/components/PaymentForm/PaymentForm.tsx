import React, { useState } from "react";

interface Account {
  iban: string;
  balance: number;
  name: string;
}

interface PaymentFormProps {
  type: string;
  accounts?: Account[];
  updateBalance?: (iban: string, newBalance: number) => void;
  onTransaction?: (transaction: Transaction) => void;
}

interface Transaction {
  date: Date;
  amount: number;
  balance: number;
  iban: string;
  owner: string;
  name: string;
  transaction_type: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  type = "withdraw",
  accounts = [],
  updateBalance = () => {},
  onTransaction = () => {},
}) => {
  const [fromIban, setFromIban] = useState("");
  const [toIban, setToIban] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [currency, setCurrency] = useState("EUR");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const handleTransaction = () => {
    const fromAccount = accounts.find((acc) => acc.iban === fromIban);
    const toAccount = accounts.find((acc) => acc.iban === toIban);
    const currentDate = new Date();

    if (typeof amount !== "number" || amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid amount.");
      return;
    }

    if (type === "withdraw" || type === "deposit") {
      if (fromAccount) {
        if (type === "withdraw") {
          if (fromAccount.balance >= amount) {
            updateBalance(fromIban, fromAccount.balance - amount);
            onTransaction({
              date: currentDate,
              amount: -amount,
              balance: fromAccount.balance - amount,
              iban: fromIban,
              owner: "John Doe",
              name: fromAccount.name,
              transaction_type: type,
            });
            setMessage(`€${amount} withdrawn successfully!`);
          } else {
            setMessage("Insufficient funds.");
          }
        } else if (type === "deposit") {
          updateBalance(fromIban, fromAccount.balance + amount);
          onTransaction({
            date: currentDate,
            amount: amount,
            balance: fromAccount.balance + amount,
            iban: fromIban,
            owner: "John Doe",
            name: fromAccount.name,
            transaction_type: type,
          });
          setMessage(`€${amount} deposited successfully!`);
        }
      } else {
        setMessage("Account not found.");
      }
    } else if (type === "transfer") {
      if (fromAccount && toAccount) {
        if (fromAccount.balance >= amount) {
          updateBalance(fromIban, fromAccount.balance - amount);
          updateBalance(toIban, toAccount.balance + amount);
          onTransaction({
            date: currentDate,
            amount: -amount,
            balance: fromAccount.balance - amount,
            iban: fromIban,
            owner: "John Doe",
            name: fromAccount.name,
            transaction_type: type,
          });
          onTransaction({
            date: currentDate,
            amount: amount,
            balance: toAccount.balance + amount,
            iban: toIban,
            owner: "John Doe",
            name: toAccount.name,
            transaction_type: type,
          });
          setMessage(`€${amount} transferred successfully!`);
        } else {
          setMessage("Insufficient funds.");
        }
      } else {
        setMessage("One or both accounts not found.");
      }
    }

    setAmount(0);
    setFromIban("");
    setToIban("");

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "fromIban") {
      setFromIban(value);
    } else if (name === "toIban") {
      setToIban(value);
    } else if (name === "amount") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setAmount(numericValue ? parseFloat(numericValue) : "");
    }
  };

  const handleIbansSwitch = () => {
    setFromIban(toIban);
    setToIban(fromIban);
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
                required
              />
              <div className="d-flex mt-3" style={{ justifyContent: "end" }}>
                <div
                  className="p-2 d-flex cursor-pointer align-items-center justify-content-center switch-ibans"
                  onClick={handleIbansSwitch}
                >
                  <img
                    src="/assets/icons/switch.svg"
                    alt=""
                    style={{ width: 20 }}
                  />
                </div>
              </div>
              <label htmlFor="toIban" className="fs-16">
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
                required
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
            type="text"
            id="amount"
            name="amount"
            value={amount === 0 ? "" : amount}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter amount"
          />
        </div>

        <div className="d-flex gap-8  mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleTransaction}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
          {showToast && (
            <div
              onTransitionEnd={() => setShowToast(false)}
              className={`d-flex message bg-secondary p-2 align-items-center gap-2 ${
                showToast ? "" : "alert-hidden"
              }`}
            >
              <span className="text-white fs-14">{message}</span>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default PaymentForm;
