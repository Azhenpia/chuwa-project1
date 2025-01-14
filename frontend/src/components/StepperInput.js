import {Box, Typography, IconButton, styled} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const StepperInputWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  border: `1px solid`,
  borderRadius: 3,
  backgroundColor: 'white',
  '& .MuiTypography-root': {
    border: `inherit`,
    borderTop: 0,
    borderBottom: 0,
    px: 1,
  },
}));

const NumberText = styled(Typography)(({theme}) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  textAlign: 'center',
  borderTop: 'none',
  borderBottom: 'none',
  '& input': {
    textAlign: 'center',
  },
}));

export default function StepperInput({
  textColor,
  bgColor,
  borderColor,
  quantity,
  setQuantity,
  max,
  min = 0,
}) {
  const handleIncrement = () => {
    if (!max || quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <StepperInputWrapper
      sx={{
        color: textColor || 'black',
        borderColor: borderColor || 'gray',
        backgroundColor: bgColor || 'white',
      }}
    >
      <IconButton onClick={handleDecrement} disabled={quantity <= min}>
        <RemoveIcon sx={{color: textColor || 'black'}} />
      </IconButton>
      <NumberText>{quantity}</NumberText>
      <IconButton onClick={handleIncrement}>
        <AddIcon sx={{color: textColor || 'black'}} />
      </IconButton>
    </StepperInputWrapper>
  );
}
