import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { addAuthHeader, API_PREFIX } from "../utils";

export default function Navbar() {
  const [searchBy, setSearchBy] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    // if (!query.trim()) {
    //   setError("Please enter a search query");
    //   return;
    // }
    if (!searchBy) {
      setError("Please select a search criteria.");
      return;
    } else {
      setError("")
    }
  
    try {
      let url = "";
      if (searchBy === "Website" || searchBy === "Username") {
        if (encodeURIComponent(query)) {
          url = searchBy === "Website" ? `${API_PREFIX}/credentials/website/${encodeURIComponent(query)}` :  `${API_PREFIX}/credentials/username/${encodeURIComponent(query)}`;
        } else {
          url = `${API_PREFIX}/credentials`;
        }
      } 
      const response = await fetch(url, {
        headers: addAuthHeader(),
      });
  
      if (!response.ok) {
        throw new Error("No credentials found for the given search query.");
      }
      const data = await response.json();
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
              className="m-0 form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-white btn" type="submit">
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
      {results.length > 0 && (
        results.map((result, index) => (
          <div key={index} className="mb-3">
            <p><strong>Website:</strong> {result.website}</p>
            <p><strong>Username:</strong> {result.username}</p>
            <p><strong>Password:</strong> {result.password}</p>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
