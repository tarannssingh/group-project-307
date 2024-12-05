import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Option1, Option2, Option3 } from './Settings';  // Named imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function Navbar() {
  
  const API_PREFIX =  "http://localhost:5478";
  const [searchBy, setSearchBy] = useState("");
  const[query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(null);

  // Function to show a specific modal
  const handleShowModal = (modalType) => {
    setShowModal(modalType);  // Set the modal type to show
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(null);  // Reset modal visibility
  };


  const handleSearch = async (e) => {
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

      const response = await fetch(url);
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
        <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            backgroundColor: "#FFC1A1", 
            border: "none", 
            appearance: "none", 
            boxShadow: "none",
            paddingRight: "0" 
          }}
        >
          <img
            src="/gear-fill.svg"
            alt="Settings"
            width="32"
            height="32"
            
          />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ marginLeft: "-100px" }}>
          <button className="dropdown-item" type="button" onClick={() => handleShowModal('Option1')}>
            Profile
          </button>
          <button className="dropdown-item" type="button" onClick={() => handleShowModal('Option2')}>
            Log Out
          </button>
          <button className="dropdown-item" type="button" onClick={() => handleShowModal('Option3')}>
            Delete Account
          </button>
        </div>
      </div>

      {/* Render the corresponding modal */}
      {showModal === 'Option1' && <Option1 show={true} onClose={handleCloseModal} />}
      {showModal === 'Option2' && <Option2 show={true} onClose={handleCloseModal} />}
      {showModal === 'Option3' && <Option3 show={true} onClose={handleCloseModal} />}
    
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
