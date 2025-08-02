import { useState, useEffect } from "react";
import { usersAPI } from "../api/endpoints";

export const useUserSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const users = await usersAPI.searchUsers(query);
        setResults(users);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to search users");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchUsers, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
  };
};
