import React from 'react';
import { Button, styled } from "@mui/material";

const CustomEditBtn = styled(Button)(({height, width, fontSize, fontWeight}) => ({
  height: height || "26px",
  width: width || "auto",
  fontSize: fontSize || "10px",
  fontWeight: fontWeight || "600",
  color: "#535353",
  textTransform: "none",
  borderColor: "#CCCCCC",
}))

export default function EditBtn({height, width, fontSize, fontWeight, text, onClick}) {
  return (
    <CustomEditBtn variant="outlined" height={height} width={width} fontSize={fontSize} fontWeight={fontWeight} onClick={onClick}>{text}</CustomEditBtn>
  )
}
