import { useState } from "react";
import Banner from "./components/Banner";
import Converter from "./components/Converter/Converter";
import ExchangeRatesChart from "./components/ExchangeRatesChart/ExchangeRatesChart";

export default function App() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 my-4">
            <h1 className="mt-3 ">
              <span id="currencytxt"> CURRENCY CONVERTER</span>
            </h1>
            <h4 className="mt-2">
              Get the best rates,{" "}
              <span className="h2Highlight">fast and simple</span>
            </h4>
          </div>
          <div className="App col-12 col-md-6">
            <Converter
              fromCurrency={fromCurrency}
              setFromCurrency={setFromCurrency}
              toCurrency={toCurrency}
              setToCurrency={setToCurrency}
            />{" "}
          </div>
        </div>

        <Banner />
        <div className="chart">
          <ExchangeRatesChart
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
          />
        </div>
        <div className="footer mt-5">
          <footer>
            {" "}
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/patricia-gracia/"
              target="_blank"
              title="LinkedIn"
            >
              Patricia Gracia.
            </a>{" "}
            {""} Open-sourced on {""}
            <a
              href="https://github.com/Patriciagracia/currency-conversion"
              target="_blank"
              title="GitHub"
            >
              Github
            </a>
            .
            <div>
              Powered by{" "}
              <a href="https://frankfurter.dev/" target="_blank" title="Api">
                Frankfurter API.
              </a>{" "}
              {""}
              Arrow icons by {""}
              <a
                href="https://www.flaticon.com/free-icons/arrow"
                title="Flaticon"
              >
                Cursor Creative - Flaticon
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
