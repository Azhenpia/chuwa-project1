import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  styled,
} from '@mui/material';
import StepperInput from '../../components/StepperInput';

export default function CartItem({product, quantity, onQuantityChange}) {
  const {name, price, imgUrl, stock} = product;
  const Row = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
    '& .MuiIconButton-root': {
      padding: 0,
    },
  }));

  return (
    <Card sx={{display: 'flex', mb: 2}}>
      <CardMedia
        component="img"
        sx={{width: 80, height: 80, p: 2}}
        image={imgUrl}
        alt={name}
      />
      <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        <CardContent>
          <Row sx={{fontSize: '1.3em'}}>
            <Typography sx={{fontWeight: 800, color: 'black'}}>
              {name}
            </Typography>
            <Typography sx={{fontWeight: 700, color: '#5048E5'}}>
              ${price.toFixed(2)}
            </Typography>
          </Row>

          <Row sx={{pt: 2}}>
            <StepperInput
              border="1px solid #DCDCDC"
              quantity={quantity}
              setQuantity={onQuantityChange}
              max={stock}
            />

            <Typography
              sx={{
                alignSelf: 'flex-start',
                color: '999999',
                textDecoration: 'underline',
                '&:hover': {
                  cursor: 'pointer',
                  fontWeight: '550',
                },
              }}
              onClick={async () => {
                await onQuantityChange(0);
              }}
            >
              Remove
            </Typography>
          </Row>
        </CardContent>
      </Box>
    </Card>
  );
}
