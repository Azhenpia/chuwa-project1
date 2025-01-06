import React from 'react';
import { TextField, styled } from "@mui/material";

const CustomizedInput = styled(TextField)(({height, fontSize}) => ({
  height: height || "56px",
  "& .MuiInputBase-input": {
    fontSize: fontSize || "16px",  
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#5048E5", 
    },
  },
  "&.Mui-error fieldset": {
    borderColor: "#FC5A44", 
  },
  "& .MuiFormHelperText-root": {
    fontSize: "14px",  
    color: "#FC5A44", 
    textAlign: "right",
  },
}))

export default function InputField({height, fontSize, error, helperText}) {
  return (
    <CustomizedInput hiddenLabel fullWidth height={height} fontSize={fontSize} error={error} helperText={helperText} />
  )
}