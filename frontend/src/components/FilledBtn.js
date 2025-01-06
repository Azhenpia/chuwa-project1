import React from 'react';
import { Button, styled } from "@mui/material";

const CustomFilledBtn = styled(Button)(({height, width, fontSize, fontWeight}) => ({
  height: height || "47px",
  width: width || "auto",
  fontSize: fontSize || "16px",
  fontWeight: fontWeight || "600",
  backgroundColor: "#5048E5",
  textTransform: "none",
}))

export default function FilledBtn({height, width, fontSize, fontWeight, text, onClick}) {
  return (
    <CustomFilledBtn variant="contained" height={height} width={width} fontSize={fontSize} fontWeight={fontWeight} onClick={onClick}>{text}</CustomFilledBtn>
  )
}
