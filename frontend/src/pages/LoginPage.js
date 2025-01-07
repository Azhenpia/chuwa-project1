import React from 'react';
import FilledBtn from '../components/FilledBtn';
import InputField from '../components/InputField';
import { Link } from 'react-router-dom';
import '../styles/AuthForm.css';

export default function LoginPage() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign in to your account</h1> 
      <div className="input-field">
        <label>Email</label>
        <InputField />
      </div>
      <div className="input-field">
        <label>Password</label>
        <InputField isPassword={true}/>
      </div>
      <div className="submit-btn">
        <FilledBtn text="Sign In" width="100%" type="submit"/>
      </div>
      <div className="footer">
        <span>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </span>
        <span>
          <Link to="/update-password">Forgot Password?</Link>
        </span>
      </div>
    </form>
  )
}