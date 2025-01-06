import React from 'react';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

export default function LoginPage() {
  return (
    <div>
      Login Page
      <CustomButton text="Sign In"/>
      <InputField fontSize="16px" error="true" helperText="Invalid Email"/>
    </div>
  )
}