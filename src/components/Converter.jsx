import { useState, useEffect, useCallback } from "react";
import Selector from "./Selector";
import useApi from "./useApi";
import exchange from "../exchange.png";

export default function Converter({
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
}) {
  const [sourceAmount, setSourceAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState("");

  const { data } = useApi({
    fromCurrency,
    toCurrency,
  });
  const rates = data?.rates;

  const sourceRate = fromCurrency === "EUR" ? 1 : rates?.[fromCurrency];
  const targetRate = toCurrency === "EUR" ? 1 : rates?.[toCurrency];

  const convertFromSource = useCallback(
    (amount) => {
      if (!sourceRate || !targetRate || isNaN(amount)) return "";
      const result = ((amount / sourceRate) * targetRate).toFixed(2);
      setTargetAmount(result);
    },
    [sourceRate, targetRate]
  );

  const convertFromTarget = useCallback(
    (amount) => {
      if (!sourceRate || !targetRate || isNaN(amount)) return "";
      const result = ((amount * sourceRate) / targetRate).toFixed(2);
      setSourceAmount(result);
    },
    [sourceRate, targetRate]
  );

  const handleSourceChange = (e) => {
    const value = e.target.value;
    setSourceAmount(value);
    convertFromSource(value);
  };

  const handleTargetChange = (e) => {
    const value = e.target.value;
    setTargetAmount(value);
    convertFromTarget(value);
  };

  useEffect(() => {
    if (sourceRate && targetRate) {
      convertFromSource(sourceAmount);
    }
  }, [sourceAmount, sourceRate, targetRate, convertFromSource]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <>
      <div className="from">
        <input
          type="number"
          value={sourceAmount}
          onChange={handleSourceChange}
        />
        <span>
          <Selector
            selectedCurrency={fromCurrency}
            setSelectedCurrency={setFromCurrency}
          />
        </span>
      </div>
      <div className="swap-btn">
        <button onClick={handleSwap}>
          <img src={exchange} alt="swap" className="icon" />
        </button>
      </div>
      <div className="to">
        <input
          type="number"
          value={targetAmount}
          onChange={handleTargetChange}
        />
        <span>
          <Selector
            selectedCurrency={toCurrency}
            setSelectedCurrency={setToCurrency}
          />
        </span>
      </div>
    </>
  );
}
