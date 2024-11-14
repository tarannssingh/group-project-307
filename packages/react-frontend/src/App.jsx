import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

function App() {
  const API_PREFIX = "http://localhost:5478";
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [characters, setCharacters] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setCharacters(json); 
        } else {
          setCharacters(null);
        }
      })      
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  function loginUser(creds) {
    return fetch(`${API_PREFIX}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((payload) => {
            setToken(payload.token);
            setMessage("Login successful; auth token saved");
          });
        } else {
          setMessage(`Login Error: ${ error }, json information ${JSON.stringify(creds)}`);
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  }
  
  function signupUser(creds) {
    const formattedCreds = {
      email: creds.email,              
      password: creds.pwd,              
      confirmPassword: creds.confirmPwd 
    };
    return fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formattedCreds)
    })
    .then((response) => {
      if (response.status === 201) {
        return response.json().then((payload) => {
          setToken(payload.token);
          setMessage(`Signup successful for user: ${creds.email}! JSON response ${JSON.stringify(payload)}`);
        });
      } else {
        setMessage(`Invalid input signup error: ${response.status} \n${errorMessage}`);
      }
    })
    .catch((error) => {
      setMessage(`Signup Error: ${error.message}\nJSON: ${JSON.stringify(creds)}`);
    });
  }
  

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function fetchUsers() {
    return fetch(`${API_PREFIX}/api/credentials`, {
      headers: addAuthHeader(),
    });
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleSubmit={loginUser} />} />
          <Route path="/signup" element={<SignUp handleSubmit={signupUser} buttonLabel="Sign Up" />} />
        </Routes>
      </BrowserRouter>
      <p>{message}</p>
    </div>
  );
}

export default App;
