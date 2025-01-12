import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);

  const handleAddClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemoveClick = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={product.imgUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body1">${product.price.toFixed(2)}</Typography>
        </CardContent>
        <Box sx={{ textAlign: "center", mt: 1, mb: 1 ,display: "flex",
            gap: "8px", // 🟩 设置排序框和按钮之间的距离
            alignItems: "center",}}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "100px", // 固定按钮宽度
              height: "40px", // 固定按钮高度
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none", // 禁用全大写
            }}
            onClick={() => (quantity === 0 ? handleAddClick() : null)}
          >
            {quantity === 0 ? (
              "ADD"
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px", // 图标和数字之间的间距
                }}
              >
                <RemoveIcon
                  fontSize="small"
                  sx={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveClick();
                  }}
                />
                <Typography variant="body2" sx={{ color: "white" }}>
                  {quantity}
                </Typography>
                <AddIcon
                  fontSize="small"
                  sx={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddClick();
                  }}
                />
              </Box>
            )}
          </Button>
          <Button size="small" variant="outlined" sx={{width:"100px",height:"40px"}}>
            Edit
          </Button>
        </Box>
      </Card>
    </div>
  );
}

export default ProductCard;

