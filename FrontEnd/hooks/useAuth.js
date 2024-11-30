import { useState } from "react";
import { API_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_AUTH_URL = `${API_BASE_URL}/auth`;

// Funcții pentru gestionarea token-ului
const saveToken = (token) => {
  return AsyncStorage.setItem("token", token).catch((error) => {
    console.error("Error saving token:", error);
  });
};

const getToken = () => {
  return AsyncStorage.getItem("token").catch((error) => {
    console.error("Error retrieving token:", error);
    return null;
  });
};

const removeToken = () => {
  return AsyncStorage.removeItem("token").catch((error) => {
    console.error("Error removing token:", error);
  });
};

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
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        setLoading(false);
        if (response.ok) {
          return saveToken(data.token).then(() => ({
            success: true,
            data,
          }));
        } else {
          setError(data.message || "Failed to register.");
          return {
            success: false,
            error: data.message || "Failed to register.",
          };
        }
      })
      .catch(() => {
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
      .then((response) => response.json().then((data) => ({ response, data })))
      .then(({ response, data }) => {
        setLoading(false);
        if (response.ok) {
          return saveToken(data.token).then(() => ({
            success: true,
            data,
          }));
        } else {
          setError(data.message || "Failed to login.");
          return {
            success: false,
            error: data.message || "Failed to login.",
          };
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong!");
        return { success: false, error: "Something went wrong!" };
      });
  };

  const fetchCurrentUser = () => {
    return getToken().then((token) => {
      if (!token) {
        return { success: false, error: "No token available" };
      }

      return fetch(`${API_AUTH_URL}/current-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) =>
          response.json().then((data) => ({ response, data }))
        )
        .then(({ response, data }) => {
          if (response.ok) {
            return { success: true, user: data.user };
          } else {
            return {
              success: false,
              error: data.message || "Failed to fetch user",
            };
          }
        })
        .catch(() => ({
          success: false,
          error: "Something went wrong!",
        }));
    });
  };

  const logout = () => {
    return removeToken();
  };

  const protectedRequest = (endpoint, options = {}) => {
    return getToken().then((token) => {
      const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      };

      return fetch(`${API_AUTH_URL}${endpoint}`, {
        ...options,
        headers,
      });
    });
  };

  return {
    register,
    login,
    fetchCurrentUser,
    logout,
    protectedRequest,
    getToken,
    loading,
    error,
  };
};
