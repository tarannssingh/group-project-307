// Login.jsx
import React, { useState } from "react";

function Login(props) {
  const [creds, setCreds] = useState({
    email: "",
    password: "",
    totp: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setCreds({ ...creds, email: value });
        break;
      case "password":
        setCreds({ ...creds, password: value });
        break;
      case "totp":
        setCreds({ ...creds, totp: value });
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ email: "", password: "", totp: "" }); // Clear form fields
  }

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={creds.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={creds.password}
        onChange={handleChange}
      />

      <label htmlFor="email">2FA</label>
      <input
        type="number" //for styling purposes
        name="totp"
        id="totp"
        value={creds.totp}
        onChange={handleChange}
      />

      <input
        type="button"
        value="Log In"
        onClick={submitForm}
      />
    </form>
  );
}

export default Login;