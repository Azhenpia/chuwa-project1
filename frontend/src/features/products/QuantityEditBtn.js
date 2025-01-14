import {Button} from '@mui/material';
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
    <Button
      variant="contained"
      color="primary"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'none',
        backgroundColor: '#5048E5',
        width: 120,
        height: 40,
      }}
      onClick={(event) => {
        event.stopPropagation();
        if (product.quantity === 0) handleQuantityChange(1);
      }}
    >
      {product.quantity === 0 ? (
        'ADD'
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
    </Button>
  );
}
