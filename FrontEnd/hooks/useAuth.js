import { useState } from "react";
import { API_BASE_URL } from "@env";

const API_AUTH_URL = `${API_BASE_URL}/api/auth`;

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = ({ name, email, password }) => {
    setLoading(true);
    setError(null);

    return fetch(`${API_AUTH_URL}/register`, {
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

  const login = ({ email, password }) => {
    setLoading(true);
    setError(null);

    return fetch(`${API_AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json().then((data) => {
          setLoading(false);
          if (response.ok) {
            return { success: true, data };
          } else {
            setError(data.message || "Failed to login.");
            return {
              success: false,
              error: data.message || "Failed to login.",
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

  return { login, register, loading, error };
};
