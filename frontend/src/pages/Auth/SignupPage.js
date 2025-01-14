import React, { useState } from "react";
import FilledBtn from "../../components/FilledBtn";
import InputField from "../../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import { signupUser } from "../../features/user/userSlice";
import { CircularProgress } from '@mui/material';

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: { hasError: false, errContent: "" },
    password: { hasError: false, errContent: "" },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [duplicateErr, setDuplicateErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fields = {
      email: form.email.value,
      password: form.password.value,
    };
    const newError = validateFields(fields);
    setError(newError);

    if (
      email &&
      password &&
      !newError.email.hasError &&
      !newError.password.hasError
    ) {
      setLoading(true);
      try {
        await dispatch(
          signupUser({
            ...fields,
            role: isAdmin ? "admin" : "regular",
          })
        ).unwrap();

        console.log("New account created");
        setTimeout(() => {
          setSuccess(true); 
          setTimeout(() => navigate("/login"), 2000); 
        }, 2000);
      } catch (err) {
        if (err.message === "User already exists") {
          setDuplicateErr("An account with this email already exists, please log in");
          setLoading(false)
        } else {
          console.log(err.message);
          setTimeout(() => {
            navigate("/error", { 
              state: { 
                hasError: "true",
                message: {err}
              }
            });
          }, 2000);
        }
      } 
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
    const isValid =
      atSymbol > 0 && dotSymbol > atSymbol + 1 && dotSymbol < email.length - 1;
    return {
      hasError: !isValid,
      errContent: isValid ? "" : "Please enter a valid email address",
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

  const validateFields = ({ email, password }) => {
    return {
      email: emailValidation(email),
      password: passwordValidation(password),
    };
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError((prev) => ({
      ...prev,
      email: emailValidation(value),
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError((prev) => ({
      ...prev,
      password: passwordValidation(value),
    }));
  };

  return success ? (
    <h3>Account created successfully! Redirecting...</h3>
  ) : (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Sign up an account</h1>
      <div className="input-field">
        <label>Email</label>
        <InputField
          name="email"
          onChange={handleEmailChange}
          error={error.email.hasError}
          helperText={error.email.errContent}
        />
      </div>
      <div className="input-field">
        <label>Password</label>
        <InputField
          name="password"
          isPassword
          onChange={handlePasswordChange}
          error={error.password.hasError}
          helperText={error.password.errContent}
        />
      </div>
      <div className="role-switch">
        <span>Are you an admin?*</span>
        <Switch
          name="role"
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
      {duplicateErr && <p className="auth-error-message">{duplicateErr}</p>}
      <div className="submit-btn">
        <FilledBtn
          text={loading ? <CircularProgress size={20} /> : "Create account"}
          width="100%"
          type="submit"
          disabled={loading}
        />
      </div>
      <div className="footer">
        <span>
          Already have an account? <Link to="/login">Sign In</Link>
        </span>
      </div>
    </form>
  );
}
