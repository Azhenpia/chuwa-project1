import React, {useState, useEffect} from 'react';
import {Box, Typography, Button, Card, CardMedia, Chip} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import QuantityEditBtn from '../../features/products/QuantityEditBtn';
import {useSelector} from 'react-redux';

const ProductDetailPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const {currentUser} = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const initialProduct = location.state?.product;
  const [product, setProduct] = useState(initialProduct);

  useEffect(() => {
    if (!initialProduct) {
      navigate('/error', {state: {hasError: true}});
    }
  }, [initialProduct, navigate]);

  useEffect(() => {
    const cartItem = cart.find((item) => item.product._id === product._id);
    setProduct((prev) => ({
      ...prev,
      quantity: cartItem ? cartItem.quantity : 0,
    }));
  }, [cart, product._id]);

  const handleEditClick = (event) => {
    event.stopPropagation();
    navigate(`/edit-product/${product._id}`, {state: {product}});
  };

  if (!product) {
    return <Typography variant="h6">Product not found.</Typography>;
  }

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: 'white',
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{fontWeight: 'bold', textAlign: 'left'}}>
        Products Detail
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: {xs: 'column', md: 'row'},
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mx: {xs: 0, md: 10},
          }}
        >
          <img
            src={product.imgUrl}
            alt={product.name}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              maxWidth: '750px',
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
            alignItems: 'flex-start',
            my: {xs: 0, md: 20},
          }}
        >
          <Typography variant="subtitle1" sx={{color: 'gray'}}>
            {product.category}
          </Typography>

          <Typography variant="h5" sx={{fontWeight: 'bold'}}>
            {product.name}
          </Typography>

          <Typography variant="h4" sx={{fontWeight: 'bold', color: 'black'}}>
            ${product.price.toFixed(2)}
            {product.stock > 0 ? (
              <Chip
                label="In Stock"
                color="success"
                size="small"
                sx={{ml: 2}}
              />
            ) : (
              <Chip
                label="Out of Stock"
                color="error"
                size="small"
                sx={{ml: 2}}
              />
            )}
          </Typography>

          <Typography variant="body1" sx={{color: 'gray'}}>
            {product.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              marginTop: 3,
            }}
          >
            <QuantityEditBtn product={product} setProduct={setProduct} />
            {currentUser?.role === 'admin' && (
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
