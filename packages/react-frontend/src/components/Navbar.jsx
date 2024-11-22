import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

export default function Navbar() {
  const API_PREFIX =  "http://localhost:5478";
  const [searchBy, setSearchBy] = useState("");
  const[query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if(!query.trim()) {
      setError("Please enter a search query");
      return;
    }
    if(!searchBy) {
      setError("Please select a search criteria.");
      return;
    }

    try {
      let url = "";
      if (searchBy === "Website") {
        url = `${API_PREFIX}/credentials/${query}`;
      } else if (searchBy === "Username") {
        url = `${API_PREFIX}/credentials/username/${query}`;
      }

      const response = fetch(url);
      if (!response.ok) {
        throw new Error("No credentials found for the given search query.");
      }

      const data = response.json();
      setResults(Array.isArray(data) ? data : [data]); // Handle single or multiple results
    } catch (err) {
      setResults([]);
      setError(err.message);
    }
  };

  return (
    <div
      className="px-4 align-items-center"
      style={{ backgroundColor: "#FFC1A1" }}
    >
      <nav className="navbar navbar-light justify-content-between text-bold">
        <h1>
          <strong>PiggyPass</strong>
        </h1>
        <div className="d-flex justify-content-center align-items-center w-50">
          <form className="px-1 d-flex align-items-center w-100"
            onSubmit={handleSearch}
          >
            <div className="select w-50 me-2">
              <Form.Select
                aria-label="Search By"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                <option value="">Search By</option>
                <option value="Website">Website</option>
                <option value="Username">Username</option>
              </Form.Select>
            </div>
            <input
              className="form-control me-2 m-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn bg-white" type="submit">
              Search
            </button>
          </form>
        </div>
        <a href="/settings">
          <img
            src="/gear-fill.svg"
            alt="settings icon"
            width="32"
            height="32"
          ></img>
        </a>
      </nav>
      <div className="mt-3">
        {error && <p className="text-danger">{error}</p>}
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="mb-2">
              <p><strong>Website:</strong> {result.website}</p>
              <p><strong>Username:</strong> {result.username}</p>
              <p><strong>Password:</strong> {result.password}</p>
            </div>
          ))
        ) : (
          query && !error && <p>No results found</p>
        )}
      </div>
    </div>
  );
}
