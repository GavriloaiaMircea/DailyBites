import { useState } from "react";
import { API_BASE_URL } from "@env";

export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = (query) => {
    if (!query.trim()) {
      console.log("The search query is empty.");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la căutare:", err);
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  return { results, search, error, loading };
};
