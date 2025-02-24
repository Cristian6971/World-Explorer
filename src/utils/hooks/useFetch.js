import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        console.log("URL accesat:", url);

        const response = await fetch(url);
        console.log("Status cod răspuns:", response.status);

        if (!response.ok) {
          throw new Error(`Eroare la fetch: Status code ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const textResponse = await response.text();
          console.error("Răspuns brut (nu JSON):", textResponse);
          throw new Error("Serverul a returnat altceva decât JSON!");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Eroare la fetch:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
