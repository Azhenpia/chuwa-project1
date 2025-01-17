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
import {useNavigate} from 'react-router-dom';

function ProductCard({product}) {
  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = (event) => {
    event.stopPropagation();
    navigate(`/edit-product/${product._id}`, {state: {product}});
  };

  const handleQuantityChange = async (newQuantity) => {
    await dispatch(updateItemsAsync({product, quantity: newQuantity}));
  };

  const handleProductClick = () => {
    navigate(`/product-detail/${product._id}`, {state: {product}});
  };

  return (
    <Card sx={{width: 225}} onClick={handleProductClick}>
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
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={product.stock === 0}
          sx={{
            width: '100px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'none',
            backgroundColor: '#5048E5',
            '&.Mui-disabled': {
              color: 'gray',
              backgroundColor: 'lightgray',
            },
          }}
          onClick={(event) => {
            event.stopPropagation();
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
        {currentUser?.role === 'admin' && (
          <Button
            size="small"
            variant="outlined"
            sx={{
              width: '100px',
              height: '40px',
              color: '#535353',
              borderColor: '#535353',
            }}
            onClick={handleEditClick}
          >
            Edit
          </Button>
        )}
      </Box>
    </Card>
  );
}

export default ProductCard;
