import React, { useState } from "react";
import FilledBtn from "../../components/FilledBtn";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import "../../styles/AuthForm.css";
import Switch from "@mui/material/Switch";

export default function SignupPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  const handleSwitchChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Sign up an account</h1>
      <div className="input-field">
        <label>Email</label>
        <InputField />
      </div>
      <div className="input-field">
        <label>Password</label>
        <InputField isPassword={true} />
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
