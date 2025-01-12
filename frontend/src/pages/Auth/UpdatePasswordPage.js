import { useState } from "react";
import FilledBtn from "../../components/FilledBtn";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";

export default function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState({email: { hasError: false, errContent: "" }});

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

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(prev => ({
      ...prev,
      email: emailValidation(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.email.hasError && email) {
      console.log("Form submitted", { email });
      navigate("/update-password/sent", { state: { emailSent: true } });
    }
  };

  return (
    <form className="auth-form update-form" onSubmit={handleSubmit}>
      <h1>Update your password</h1>
      <p id="recovery-text">Enter your email link, we will send you the recovery link</p>
      <div className="input-field">
        <label>Email</label>
        <InputField
          onChange={handleEmailChange}
          error={error.email.hasError}
          helperText={error.email.errContent}
        />
      </div>
      <div className="submit-btn">
        <FilledBtn text="Update password" width="100%" type="submit" />
      </div>
    </form>
  );
}
