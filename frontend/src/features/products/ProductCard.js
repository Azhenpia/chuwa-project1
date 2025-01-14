import React, {useEffect, useState} from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch, useSelector} from 'react-redux';
import {updateItemsAsync} from '../cart/cartSlice';

function ProductCard({product}) {
  const dispatch = useDispatch();
  const {items} = useSelector((state) => state.cart);
  const handleQuantityChange = async (newQuantity) => {
    await dispatch(updateItemsAsync({product, quantity: newQuantity}));
    console.log(items);
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
        <Box
          sx={{
            textAlign: 'center',
            mt: 1,
            mb: 1,
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '100px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'none',
            }}
            onClick={() => {
              if (product.quantity === 0) handleQuantityChange(1);
            }}
          >
            {product.quantity === 0 ? (
              'ADD'
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <RemoveIcon
                  fontSize="small"
                  sx={{cursor: 'pointer'}}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(product.quantity - 1);
                  }}
                />
                <Typography variant="body2" sx={{color: 'white'}}>
                  {product.quantity}
                </Typography>
                <AddIcon
                  fontSize="small"
                  sx={{cursor: 'pointer'}}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuantityChange(product.quantity + 1);
                  }}
                />
              </Box>
            )}
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{width: '100px', height: '40px'}}
          >
            Edit
          </Button>
        </Box>
      </Card>
    </div>
  );
}

export default ProductCard;
