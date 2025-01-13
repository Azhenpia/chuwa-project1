import {Box, Typography, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {toggleCart} from './cartSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function CartHeader() {
  const {items} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const getItemsCnt = (items) => {
    return items?.reduce((acc, curr) => {
      return acc + (curr?.quantity ?? 0);
    }, 0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#5048e5',
        alignItems: 'center',
        margin: 0,
        padding: 2,
        color: 'white',
      }}
    >
      <Typography variant="h5" sx={{fontWeight: 'bold'}}>
        Cart ({getItemsCnt(items)})
      </Typography>
      <IconButton
        onClick={() => dispatch(toggleCart())}
        sx={{
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
