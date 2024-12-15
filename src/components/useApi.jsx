import { useState, useEffect } from "react";

export default function useApi() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://api.frankfurter.dev/v1/latest")
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          setError(error.message);
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return { data, error };
}
