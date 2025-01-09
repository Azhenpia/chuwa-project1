import React from 'react';
import FilledBtn from '../../components/FilledBtn';
import InputField from '../../components/InputField';
import {Link, useNavigate} from 'react-router-dom';
import '../../styles/AuthForm.css';
import {useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';
import {setUser, loginUser} from '../../features/user/userSlice';
import {jwtDecode} from 'jwt-decode';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const result = await dispatch(
        loginUser({email: form.email.value, password: form.password.value})
      );
      const {token} = await unwrapResult(result);
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded));
      console.log('Submitted - LoginPage');
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
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
        <FilledBtn text="Sign In" width="100%" type="submit" />
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
