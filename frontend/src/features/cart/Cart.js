import {Box, Divider, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from './CartItem';
import CartHeader from './CartHeader';
import CartDiscount from './CartDiscount';
import CartFooter from './CartFooter';
import {useLocation} from 'react-router';
import {closeCart} from './cartSlice';
import {updateItemsAsync} from './cartSlice';
import {useDeleteProductMutation} from '../api/apiSlice';

export default function Cart() {
  const {items} = useSelector((state) => state.cart);
  const [deleteItem] = useDeleteProductMutation();
  const location = useLocation();
  const dispatch = useDispatch();
  if (location.pathname !== '/') {
    dispatch(closeCart());
    return <></>;
  }

  const handleQuantityChange = (product) => async (newQuantity) => {
    console.log(newQuantity);
    await dispatch(updateItemsAsync({product, quantity: newQuantity}));
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: {xs: 'var(--header-height)', sm: 0},
        bottom: {xs: 'var(--footer-height)'},
        right: 0,
        width: {xs: '100%', sm: '30%'},
        height: {
          xs: 'calc(100vh - var(--header-height) - var(--footer-height))',
          sm: '85%',
        },
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1300,
      }}
    >
      <CartHeader />
      {console.log(items)}

      <Box sx={{flex: 1, overflowY: 'auto', mx: 6}}>
        {items.length > 0 ? (
          items.map((item) => (
            <CartItem
              key={item._id}
              product={item.product}
              quantity={item.quantity}
              onQuantityChange={handleQuantityChange(item.product)}
            />
          ))
        ) : (
          <Typography
            sx={{
              textAlign: 'center',
              color: 'gray',
              mt: 5,
            }}
          >
            Your cart is empty
          </Typography>
        )}
      </Box>

      <CartDiscount />
      <Divider />
      <CartFooter />
    </Box>
  );
}
