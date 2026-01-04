import { useRef, useState } from 'react';
import Wrapper from "./Wrapper";
import ThemeDropdown from "./ThemeDropdown";
import { useNewsContext } from "../context/NewsContext";

const Navbar = ({className}) => {
  const { setNews, fetchNews, loading } = useNewsContext();
  const timerRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value.trim();
    setSearchValue(value);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    if (!value) return;
    
    timerRef.current = setTimeout(async () => {
      performSearch(value);
    }, 1000);
  };

  const performSearch = async (query) => {
    if (!query) return;
    
    try {
      const data = await fetchNews(`/everything?q=${query}`);
      if (data?.articles) {
        setNews(data.articles);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSearchSubmit = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    performSearch(searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setIsSearchExpanded(false);
  };

  return (
    <div className={`bg-base-200 shadow-sm sticky top-0 z-50 ${className}`}>
      <Wrapper>
        <div className="navbar px-0">

          {/* LEFT */}
          <div className="flex-1">
            <a className="btn btn-ghost text-xl font-bold">
              <span className="text-primary">📰</span> QuickNews
            </a>
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search Input */}
            <div className={`relative transition-all duration-300 ${isSearchExpanded ? 'w-64' : 'w-48'}`}>
              <input
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                value={searchValue}
                type="text"
                placeholder="Search news..."
                className="input input-bordered w-full pr-10"
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => {
                  if (!searchValue) setIsSearchExpanded(false);
                }}
              />
              {searchValue && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-circle"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Button */}
            <button 
              onClick={handleSearchSubmit}
              className="btn btn-primary"
              disabled={!searchValue || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>

            {/* Notifications */}
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item" />
              </div>
            </button>

            {/* THEME SELECTOR (Desktop) */}
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-sm gap-2">
                🎨 Theme
              </button>
              <div tabIndex={0} className="dropdown-content">
                <ThemeDropdown />
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET */}
          <div className="lg:hidden dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div
              tabIndex={0}
              className="dropdown-content mt-3 z-50 p-4 shadow-lg bg-base-100 rounded-box w-[calc(100vw-2rem)] max-w-sm"
            >
              <div className="flex flex-col gap-3">
                {/* Mobile Search */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-base-content/70">Search News</label>
                  <div className="flex gap-2">
                    <input
                      onChange={handleSearchChange}
                      onKeyPress={handleKeyPress}
                      value={searchValue}
                      type="text"
                      placeholder="Type to search..."
                      className="input input-bordered flex-1 text-sm"
                    />
                    <button 
                      onClick={handleSearchSubmit}
                      className="btn btn-primary btn-sm"
                      disabled={!searchValue || loading}
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {searchValue && (
                    <button
                      onClick={() => setSearchValue("")}
                      className="btn btn-ghost btn-xs self-start"
                    >
                      Clear search
                    </button>
                  )}
                </div>

                <div className="divider my-0" />

                {/* Notifications */}
                <button className="btn btn-ghost justify-start text-sm h-auto min-h-10 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="flex-1 text-left">Notifications</span>
                  <span className="badge badge-primary badge-sm">1</span>
                </button>

                <div className="divider my-0" />

                {/* THEME BUTTON (mobile) */}
                <details className="collapse collapse-arrow bg-base-200 rounded-box">
                  <summary className="collapse-title font-medium text-sm min-h-10 py-2">
                    🎨 Theme
                  </summary>
                  <div className="collapse-content px-2 pb-2">
                    <ThemeDropdown />
                  </div>
                </details>
              </div>
            </div>
          </div>

        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;