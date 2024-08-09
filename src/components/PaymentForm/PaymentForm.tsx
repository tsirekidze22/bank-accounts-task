import React, { useState } from "react";

const PaymentForm = () => {
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [currency, setCurrency] = useState("EUR");

  const handleWithdraw = () => {
    // Logic for handling withdrawal
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
    <section className="payment-form container d-flex flex-column align-items-center gap-16 mt-5">
      <h3 className="fs-24">Withdraw Money</h3>

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
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
    </section>
  );
};

export default PaymentForm;
