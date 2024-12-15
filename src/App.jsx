import { useState } from "react";
import "./App.css";
import Converter from "./components/Converter";

function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  return (
    <>
      <h1 className="mt-3">
        <span id="currencytxt"> Currency Converter</span>
        <small
          style={{
            display: "block",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#666",
          }}
        >
          Get the best rates, fast and simple
        </small>
      </h1>
      <div className="App">
        <Converter
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          toCurrency={toCurrency}
          setToCurrency={setToCurrency}
        />{" "}
      </div>
      <div className="chart"></div>
      <div className="footer mt-5">
        <footer>
          {" "}
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/patricia-gracia/"
            target="_blank"
          >
            Patricia Gracia
          </a>{" "}
          {""}. Open-sourced on {""}
          <a
            href="https://github.com/Patriciagracia/currency-conversion"
            target="_blank"
          >
            Github
          </a>
          .
          <div className="credits">
            <a
              href="https://www.flaticon.com/free-icons/arrow"
              title="arrow icons"
            >
              Arrow icons created by Cursor Creative - Flaticon
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
