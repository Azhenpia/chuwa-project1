import {Box, Button} from '@mui/material';
import StepperInput from '../../components/StepperInput';
import {useDispatch} from 'react-redux';
import {updateItemsAsync} from '../cart/cartSlice';

export default function QuantityEditBtn({product, setProduct}) {
  const dispatch = useDispatch();
  const handleQuantityChange = async (newQuantity) => {
    await dispatch(updateItemsAsync({product, quantity: newQuantity}));
    setProduct((prev) => ({
      ...prev,
      quantity: newQuantity,
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'none',
        backgroundColor: '#5048E5',
        borderRadius: 3,
        width: 120,
        height: 40,
      }}
    >
      {product.quantity === 0 ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={product.stock === 0}
          sx={{
            height: '100%',
            textTransform: 'none',
            backgroundColor: '#5048E5',
            '&.Mui-disabled': {
              color: 'gray',
              backgroundColor: 'lightgray',
            },
          }}
          onClick={(event) => {
            event.stopPropagation();
            handleQuantityChange(1);
          }}
        >
          ADD
        </Button>
      ) : (
        <StepperInput
          textColor="white"
          bgColor="#5048E5"
          borderColor="#5048E5"
          quantity={product.quantity}
          setQuantity={handleQuantityChange}
          max={product.stock}
        />
      )}
    </Box>
  );
}
