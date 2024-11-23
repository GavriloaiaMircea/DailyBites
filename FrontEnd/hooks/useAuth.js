import { useState } from "react";

const API_BASE_URL = "http://192.168.1.128:3000/api/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = ({ name, email, password }) => {
    setLoading(true);
    setError(null);

    return fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => {
        return response.json().then((data) => {
          setLoading(false);
          if (response.ok) {
            return { success: true, data };
          } else {
            setError(data.message || "Failed to register.");
            return {
              success: false,
              error: data.message || "Failed to register.",
            };
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        setError("Something went wrong!");
        return { success: false, error: "Something went wrong!" };
      });
  };

  return { register, loading, error };
};
