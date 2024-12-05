import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { API_PREFIX } from "./utils";



function App() {
  // process.env.API_PREFIX ||  
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  async function loginUser(creds) {
    setMessage("");
    const response = await fetch(`${API_PREFIX}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds)
      })
    const json = await response.json()
    if (response.status == 200 ) {
      console.log(json)
      setToken(json.message);
      sessionStorage.setItem('token', json.message)
      return true;
    } else {
      setMessage(`Login Error: ${json.error}`);
      return false;
    }
  }

  function signupUser(creds) {
    setMessage("");
    const formattedCreds = {
      email: creds.email,
      password: creds.pwd,
      confirmPassword: creds.confirmPwd,
    };
    return fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedCreds),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json().then((payload) => {
            setToken(payload.token);
            setMessage(
              `Signup successful for user: ${creds.email}! Please use this code in your authenticator app to connect your PiggyPass Account and then proceed to the login page and log in: ${payload.totp_secret}`,
            );
          });
        } else {
          return response.json().then((errorData) => {
            const errorMessage =
              errorData.message ||
              errorData.errors?.map((e) => e.msg).join(", ");
            setMessage(`Invalid input Signup error: ${errorMessage}`);
          });
        }
      })
      .catch((error) => {
        setMessage(
          `Signup Error: ${error.message}\nJSON: ${JSON.stringify(creds)}`,
        );
      });
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login handleSubmit={loginUser} message={message} setMessage={setMessage} />
            }
          />
          <Route
            path="/signup"
            element={<SignUp handleSubmit={signupUser} message={message} setMessage={setMessage}/>}
          />
        </Routes>
      </BrowserRouter>
      <p>{message}</p>
    </div>
  );
}

export default App;


