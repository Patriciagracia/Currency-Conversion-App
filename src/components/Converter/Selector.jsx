/* eslint-disable react/prop-types */
import styles from "./Converter.module.css";

export default function Selector({ selectedCurrency, setSelectedCurrency }) {
  const currencies = {
    AUD: "Australian Dollar",
    BGN: "Bulgarian Lev",
    BRL: "Brazilian Real",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Renminbi Yuan",
    CZK: "Czech Koruna",
    DKK: "Danish Krone",
    EUR: "Euro",
    GBP: "British Pound",
    HKD: "Hong Kong Dollar",
    HUF: "Hungarian Forint",
    IDR: "Indonesian Rupiah",
    ILS: "Israeli New Sheqel",
    INR: "Indian Rupee",
    ISK: "Icelandic Króna",
    JPY: "Japanese Yen",
    KRW: "South Korean Won",
    MXN: "Mexican Peso",
    MYR: "Malaysian Ringgit",
    NOK: "Norwegian Krone",
    NZD: "New Zealand Dollar",
    PHP: "Philippine Peso",
    PLN: "Polish Złoty",
    RON: "Romanian Leu",
    SEK: "Swedish Krona",
    SGD: "Singapore Dollar",
    THB: "Thai Baht",
    TRY: "Turkish Lira",
    USD: "United States Dollar",
    ZAR: "South African Rand",
  };

  const listOfCurrencies = Object.entries(currencies).map(([symbol, name]) => (
    <option key={symbol} value={symbol}>
      {name}
    </option>
  ));

  return (
    <select
      value={selectedCurrency}
      onChange={(e) => setSelectedCurrency(e.target.value)}
      className={styles.selector}
    >
      <option value="" disabled>
        Select a currency
      </option>
      {listOfCurrencies}
    </select>
  );
}
