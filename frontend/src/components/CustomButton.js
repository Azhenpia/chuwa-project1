import React from 'react';
import { Button, styled } from "@mui/material";

const CustomizedBtn = styled(Button)(({height, width, fontSize}) => ({
  height: height || "47px",
  width: width || "auto",
  fontSize: fontSize || "16px",
  backgroundColor: "#5048E5",
  textTransform: "none",
}))

export default function CustomButton({height, width, fontSize, text, onClick}) {
  return (
    <div>
      <CustomizedBtn variant="contained" height={height} width={width} fontSize={fontSize} onClick={onClick}>{text}</CustomizedBtn>
    </div>
  )
}
