import CustomFilledBtn from '../../components/FilledBtn';
import {Box, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useCheckoutMutation} from '../api/apiSlice';
import {clearCart, toggleCart} from './cartSlice';
import {styled} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Row = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
  '& .MuiTypography-root': {
    fontWeight: 700,
    color: 'black',
  },
}));

export default function CartFooter() {
  const [checkout, {isLoading}] = useCheckoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {subtotal, tax, estimatedTotal, discount} = useSelector(
    (state) => state.cart
  );
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const handleCheckout = async () => {
    try {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }
      const {message} = await checkout().unwrap();
      console.log(message);
      dispatch(clearCart());
      dispatch(toggleCart());
      navigate('/', {state: {updated: true}});
    } catch (err) {
      console.error('Failure happened during checkout:', err.message);
    }
  };

  return (
    <Box sx={{mx: 6, my: 2}}>
      <Row>
        <Typography>Subtotal:</Typography>
        <Typography>${subtotal.toFixed(2)}</Typography>
      </Row>
      <Row>
        <Typography>Tax:</Typography>
        <Typography>${tax.toFixed(2)}</Typography>
      </Row>
      <Row>
        <Typography>Discount:</Typography>
        <Typography>-${discount.toFixed(2)}</Typography>
      </Row>
      <Row>
        <Typography>Total:</Typography>
        <Typography>${estimatedTotal.toFixed(2)}</Typography>
      </Row>
      <CustomFilledBtn
        sx={{my: 2}}
        width="100%"
        text={isLoading ? 'Processing...' : 'Continue to Checkout'}
        onClick={handleCheckout}
        disabled={isLoading}
      ></CustomFilledBtn>
    </Box>
  );
}
