import { createContext, useContext, useState, useCallback, useMemo } from "react";
import api from "../config/axios";

// Create context with default values for better TypeScript support
const NewsContext = createContext({
  news: [],
  setNews: () => {},
  fetchNews: async () => {},
  loading: false,
  error: null,
  clearError: () => {},
});

/**
 * NewsContextProvider - Manages global news state and API calls
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
const NewsContextProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches news from the API
   * @param {string} url - API endpoint URL (default: "/everything?q=india")
   * @param {Object} options - Additional fetch options
   * @returns {Promise<Object|null>} API response data or null on error
   */
  const fetchNews = useCallback(async (url = "/everything?q=india", options = {}) => {
    // Validate API key
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      const error = "API key is missing. Please check your environment variables.";
      console.error(error);
      setError(error);
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      // Build complete URL with API key
      const fullUrl = `${url}${url.includes('?') ? '&' : '?'}apiKey=${apiKey}`;
      
      // Make API request
      const response = await api.get(fullUrl, options);
      
      // Validate response
      if (!response.data) {
        throw new Error("No data received from API");
      }

      // Validate articles array
      if (response.data.articles && !Array.isArray(response.data.articles)) {
        throw new Error("Invalid data format received from API");
      }

      return response.data;
    } catch (error) {
      // Enhanced error handling
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to fetch news. Please try again later.";
      
      console.error("News fetch error:", {
        message: errorMessage,
        status: error.response?.status,
        url: url,
        timestamp: new Date().toISOString()
      });
      
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clears the current error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Resets all state to initial values
   */
  const resetNews = useCallback(() => {
    setNews([]);
    setError(null);
    setLoading(false);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      news,
      setNews,
      fetchNews,
      loading,
      error,
      clearError,
      resetNews,
    }),
    [news, fetchNews, loading, error, clearError, resetNews]
  );

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};

/**
 * Custom hook to use NewsContext
 * @returns {Object} News context value
 * @throws {Error} If used outside NewsContextProvider
 */
const useNewsContext = () => {
  const context = useContext(NewsContext);
  
  if (!context) {
    throw new Error(
      "useNewsContext must be used within NewsContextProvider. " +
      "Wrap your component tree with <NewsContextProvider>."
    );
  }
  
  return context;
};

export { NewsContextProvider, useNewsContext };