import {useState} from 'react';
import {Box, TextField, InputLabel} from '@mui/material';
import FilledBtn from '../../components/FilledBtn';
import {useApplyDiscountMutation} from '../api/apiSlice';
import {useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {updateCart} from './cartSlice';

export default function CartDiscount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [helperText, setHelperText] = useState('');
  const {isAuthenticated} = useSelector((state) => state.user);
  const [applyDiscount, {isLoading}] = useApplyDiscountMutation();

  const forwardToLogin = () => {
    alert('Please Login First.');
    navigate('/login');
  };

  const handleClick = async () => {
    try {
      setHelperText('');
      if (!isAuthenticated) {
        forwardToLogin();
        return;
      }
      const {cart: newCart} = await applyDiscount(code).unwrap();
      dispatch(updateCart(newCart));
      console.log('Discount applied successfully');
    } catch (err) {
      if (err.status === 401) {
        forwardToLogin();
        return;
      }
      setHelperText(err.message);
      console.error('Failed to apply discount:', err);
    }
  };

  return (
    <Box sx={{p: 2, mx: 4}}>
      <InputLabel
        sx={{
          fontSize: '0.85rem',
          color: 'gray',
        }}
        htmlFor="code"
      >
        Apply Discount Code
      </InputLabel>
      <Box sx={{display: 'flex', mt: 1, boxSizing: 'border-box'}}>
        <TextField
          label="Input code"
          size="small"
          variant="outlined"
          sx={{flex: 1, mr: 2}}
          height="20px"
          name="code"
          maxRows={1}
          value={code}
          helperText={helperText}
          onChange={(e) => setCode(e.target.value)}
        />
        <FilledBtn
          height="40px"
          text={isLoading ? 'Applying...' : 'Apply'}
          disabled={isLoading}
          onClick={handleClick}
        ></FilledBtn>
      </Box>
    </Box>
  );
}
