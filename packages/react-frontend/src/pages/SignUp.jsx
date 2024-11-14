import React, { useState } from "react";

function SignUp(props) {
  const [creds, setCreds] = useState({
    email: "",
    pwd: "",
    confirmPwd: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setCreds({ ...creds, email: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
      case "confirmPassword":
        setCreds({ ...creds, confirmPwd: value });
        break;
    }
  }

  function submitForm() {
    props.handleSubmit(creds);
    setCreds({ email: "", pwd: "", confirmPwd: "" });
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
      <label htmlFor="password">Create Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={creds.pwd}
        onChange={handleChange}
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={creds.confirmPwd}
        onChange={handleChange}
      />
      <input
        type="button"
        value={props.buttonLabel || "Sign Up"}
        onClick={submitForm}
      />
    </form>
  );
}

export default SignUp;
