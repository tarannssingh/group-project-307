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
    setMessage("");
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
            return true;
          });
        } else {
          setMessage(`Login Error: ${ error }, json information ${JSON.stringify(creds)}`);
          return false;
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
        return false;
      });
  }
  
  function signupUser(creds) {
    setMessage("");
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
          setMessage(`Signup successful for user: ${creds.email}! Please use this code in your authenticator app to connect your PiggyPass Account: ${payload.totp_secret}`);
        });
      } else {
        return response.json().then((errorData) => {
          const errorMessage = errorData.message || errorData.errors?.map(e => e.msg).join(", ");
          setMessage(`Invalid input Signup error: ${errorMessage}`);
        });
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
    return fetch(`${API_PREFIX}/users`, {
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
