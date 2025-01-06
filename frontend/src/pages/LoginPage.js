import React from 'react';
import CustomButton from '../components/FilledBtn';
import InputField from '../components/InputField';
import OutlinedBtn from '../components/EditBtn';

export default function LoginPage() {
  return (
    <div>
      Login Page
      <CustomButton text="Sign In"/>
      <InputField fontSize="16px" error="true" helperText="Invalid Email"/>
      <OutlinedBtn text="Edit"/>
    </div>
  )
}