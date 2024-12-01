import { useState } from "react";
import { API_BASE_URL } from "@env";

export const useFoodDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFoodDetails = (id) => {
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/details/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setDetails(null);
        setLoading(false);
        console.error("Error fetching food details:", err);
      });
  };

  return { details, fetchFoodDetails, loading, error };
};
