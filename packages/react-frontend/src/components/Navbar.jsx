import React, { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import { addAuthHeader, API_PREFIX } from "../utils";
import { LoginContext } from "../pages/Home";
import { Option1, Option2, Option3 } from './Settings';  // Named imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function Navbar() {
  
  const [searchBy, setSearchBy] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const search = useContext(LoginContext)

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
      search.setLogins(Array.isArray(data) ? data : [data])
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
        <div className="dropdown">
        <button
          className="btn btn-secondary"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            backgroundColor: "#FFC1A1", 
            border: "none", 
            appearance: "none", 
            boxShadow: "none",
            paddingRight: "0",
            content: "none"
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
      
          <button className="dropdown-item" type="button" onClick={() => handleShowModal('Option2')}>
            Log Out
          </button>
          <button className="dropdown-item" type="button" onClick={() => handleShowModal('Option3')}>
            Delete Account
          </button>
        </div>
      </div>

      {/* Render the corresponding modal */}
      
      {showModal === 'Option2' && <Option2 show={true} onClose={handleCloseModal} />}
      {showModal === 'Option3' && <Option3 show={true} onClose={handleCloseModal} />}
    
      </nav>
      <div className="mt-3">
      {error && <p className="text-danger">{error}</p>}
      {/* {results.length > 0 && (
        results.map((result, index) => (
          <div key={index} className="mb-3">
            <p><strong>Website:</strong> {result.website}</p>
            <p><strong>Username:</strong> {result.username}</p>
            <p><strong>Password:</strong> {result.password}</p>
          </div>
        ))
      )} */}
      </div>
    </div>
  );
}
