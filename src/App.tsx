import "./App.css";
import AccountsList from "./components/Accounts/AccountsList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import PaymentForm from "./components/PaymentForm/PaymentForm";

function App() {
  return (
    <>
      <Header />
      <AccountsList />
      <PaymentForm />
      <Footer />
    </>
  );
}

export default App;
