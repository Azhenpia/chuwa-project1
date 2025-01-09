import React, {useState} from 'react';
import FilledBtn from '../../components/FilledBtn';
import InputField from '../../components/InputField';
import {Link, useNavigate} from 'react-router-dom';
import '../../styles/AuthForm.css';
import Switch from '@mui/material/Switch';
import {useDispatch} from 'react-redux';
import {signupUser} from '../../features/user/userSlice';

export default function SignupPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      dispatch(
        signupUser({
          email: form.email.value,
          password: form.password.value,
          role: isAdmin ? 'admin' : 'regular',
        })
      );
      console.log('Submitted');
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSwitchChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Sign up an account</h1>
      <div className="input-field">
        <label>Email</label>
        <InputField name="email" />
      </div>
      <div className="input-field">
        <label>Password</label>
        <InputField name="password" isPassword={true} />
      </div>
      <div className="role-switch">
        <span>Are you a seller?*</span>
        <Switch
          name="role"
          checked={isAdmin}
          onChange={handleSwitchChange}
          sx={{
            '& .MuiSwitch-thumb': {
              backgroundColor: isAdmin ? '#5048E5' : 'gray',
            },
            '& .MuiSwitch-track': {
              backgroundColor: 'lightgray',
            },
          }}
        />
        <span>{isAdmin ? 'Yes' : 'No'}</span>
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
