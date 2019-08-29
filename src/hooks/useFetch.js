// hooks.js
import { useState, useEffect } from "react";

function useFetch(url, method) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(url, {
        method: method,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await response.json();

    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}
export { useFetch };