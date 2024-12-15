import UseApi from "./useApi";

export default function Rates() {
  const { data } = UseApi();
  const ratesList = data?.rates
    ? Object.entries(data.rates).map(([symbol, rate]) => (
        <li key={symbol}>
          {symbol}: {rate}
        </li>
      ))
    : null;

  return (
    <>
      <h3> Rates (based on 1Eur) </h3>
      <div>
        <ul>
          <li>{ratesList}</li>
        </ul>
      </div>
    </>
  );
}
