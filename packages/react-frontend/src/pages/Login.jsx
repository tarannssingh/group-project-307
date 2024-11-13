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
    setCreds({ ...creds, [name]: value });
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
      <input
        type="button"
        value="Log In"
        onClick={submitForm}
      />
    </form>
  );
}

export default Login;