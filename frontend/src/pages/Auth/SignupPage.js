import React, { useState } from "react";
import FilledBtn from "../../components/FilledBtn";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import "../../styles/AuthForm.css";
import Switch from "@mui/material/Switch";

export default function SignupPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: { hasError: false, errContent: "" },
    password: { hasError: false, errContent: "" },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {
      email: emailValidation(email),
      password: passwordValidation(password),
    };
    setError(newError);
    if (email && password && !newError.email.hasError && !newError.password.hasError) {
      console.log("Form submitted", { email, password, isAdmin });
    }
  };

  const handleSwitchChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const emailValidation = (email) => {
    if (!email) {
      return { hasError: true, errContent: "Email is required" };
    }
    const atSymbol = email.indexOf("@");
    const dotSymbol = email.lastIndexOf(".");
    const domain = email.endsWith('.com')
    const isValid = atSymbol > 0 && dotSymbol > atSymbol + 1 && dotSymbol < email.length - 1 && domain;
    
    return {
      hasError: !isValid,
      errContent: isValid ? "" : "Please enter a valid email address"
    };
  };

  const passwordValidation = (password) => {
    if (!password) {
      return { hasError: true, errContent: "Password is required" };
    }
    if (password.length < 8) {
      return {
        hasError: true,
        errContent: "Password must be at least 8 characters",
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        hasError: true,
        errContent: "Password must contain at least one uppercase letter",
      };
    }
    if (!/[0-9]/.test(password)) {
      return {
        hasError: true,
        errContent: "Password must contain at least one digit",
      };
    }
    return { hasError: false, errContent: "" };
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(prev => ({
      ...prev,
      email: emailValidation(value)
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError(prev => ({
      ...prev,
      password: passwordValidation(value)
    }));
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Sign up an account</h1>
      <div className="input-field">
        <label>Email</label>
        <InputField
          onChange={handleEmailChange}
          error={error.email.hasError}
          helperText={error.email.errContent}
        />
      </div>
      <div className="input-field">
        <label>Password</label>
        <InputField
          isPassword={true}
          onChange={handlePasswordChange}
          error={error.password.hasError}
          helperText={error.password.errContent}
        />
      </div>
      <div className="role-switch">
        <span>Are you a seller?*</span>
        <Switch
          checked={isAdmin}
          onChange={handleSwitchChange}
          sx={{
            "& .MuiSwitch-thumb": {
              backgroundColor: isAdmin ? "#5048E5" : "gray",
            },
            "& .MuiSwitch-track": {
              backgroundColor: "lightgray",
            },
          }}
        />
        <span>{isAdmin ? "Yes" : "No"}</span>
      </div>
      <div className="submit-btn">
        <FilledBtn text="Create account" width="100%" type="submit" />
      </div>
      <div className="footer">
        <span>
          Already have an account? <Link to="/login">Sign In</Link>
        </span>
      </div>
    </form>
  );
}