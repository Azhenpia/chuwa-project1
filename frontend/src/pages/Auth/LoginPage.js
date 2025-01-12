import React, {useState} from 'react';
import FilledBtn from '../../components/FilledBtn';
import InputField from '../../components/InputField';
import {Link, useNavigate} from 'react-router-dom';
import '../../styles/AuthForm.css';
import {useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {setUser, loginUser} from '../../features/user/userSlice';
import {jwtDecode} from 'jwt-decode';
import { CircularProgress } from '@mui/material';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target;
      const result = await dispatch(
        loginUser({email: form.email.value, password: form.password.value})
      );
      const {token} = await unwrapResult(result);
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));
      
      console.log('Login Successful');
      setTimeout(() => {
        setSuccess(true); 
        setTimeout(() => navigate("/"), 2000); 
      }, 2000);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return success ? (
    <h3>Logged in successfully! Redirecting...</h3>
  ) : (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Sign in to your account</h1>
      <div className="input-field">
        <label>Email</label>
        <InputField name="email" />
      </div>
      <div className="input-field">
        <label>Password</label>
        <InputField name="password" isPassword={true} />
      </div>
      <div className="submit-btn">
        <FilledBtn text={loading ? <CircularProgress size={20} /> : "Sign In"} width="100%" type="submit" disabled={loading}/>
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
  );
}
