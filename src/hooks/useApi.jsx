import { useState, useEffect } from "react";

const URL = "https://api.frankfurter.dev/v1";

export default function useApi({
  startDate = null,
  endDate = null,
  baseCurrency = "EUR",
  targetCurrency = null,
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (baseCurrency === targetCurrency) {
          const getDateRangeForSameCurrency = (start, end) => {
            const dates = [];
            const current = new Date(start);
            const endDate = new Date(end);

            while (current <= endDate) {
              dates.push(current.toISOString().split("T")[0]);
              current.setDate(current.getDate() + 1);
            }

            return dates;
          };

          const sameCurrencyRates = {};
          getDateRangeForSameCurrency(startDate, endDate).forEach((date) => {
            sameCurrencyRates[date] = { [targetCurrency]: 1 };
          });

          setData({
            base: baseCurrency,
            rates: sameCurrencyRates,
          });
          setLoading(false);
          return;
        }

        let url;

        if (startDate && endDate) {
          url = `${URL}/${startDate}..${endDate}?from=${baseCurrency}${
            targetCurrency ? `&to=${targetCurrency}` : ""
          }`;
        } else if (startDate) {
          url = `${URL}/${startDate}?from=${baseCurrency}${
            targetCurrency ? `&to=${targetCurrency}` : ""
          }`;
        } else {
          url = `${URL}/latest?from=${baseCurrency}${
            targetCurrency ? `&to=${targetCurrency}` : ""
          }`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, baseCurrency, targetCurrency]);

  return { data, error, loading };
}
