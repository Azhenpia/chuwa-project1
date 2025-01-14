import React, {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import {styled, alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../../features/user/userSlice';
import {useNavigate, useLocation} from 'react-router';
import Cart from '../../features/cart/Cart';
import {updateCart, toggleCart} from '../../features/cart/cartSlice';
import {useFetchCartQuery} from '../../features/api/apiSlice';

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '1000px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
      '&:focus': {
        width: '60ch',
      },
    },
  },
}));

const SignoutBtn = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const {estimatedTotal, isExpanded} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: fetchedCart,
    isSuccess,
    isLoading,
  } = useFetchCartQuery(undefined, {
    skip: !user.isAuthenticated || cart?.items?.length > 0,
  });

  useEffect(() => {
    if (fetchedCart) dispatch(updateCart(fetchedCart));
  }, [fetchedCart, isSuccess, dispatch]);

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor: '#121c36'}}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              paddingLeft: 5,
              display: {xs: 'none', sm: 'block'},
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => navigate('/')}
          >
            Management{' '}
            <Typography component="b" sx={{fontSize: 10, fontWeight: 600}}>
              Chuwa
            </Typography>
          </Typography>

          {/* Mobile: small logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 700,
              display: {xs: 'block', sm: 'none'},
            }}
            onClick={() => navigate('/')}
          >
            M
          </Typography>

          {/* Search Bar */}
          <Box
            sx={{
              flexGrow: 1,
              display: {xs: 'none', sm: 'flex'},
              justifyContent: 'center',
            }}
          >
            <Search>
              <StyledInputBase
                placeholder="Search"
                inputProps={{'aria-label': 'search'}}
              />
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </Search>
          </Box>

          {/* Right Section: User and Cart */}
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => navigate('/login')}
            >
              <AccountCircle />
            </IconButton>
            {user.isAuthenticated && (
              <SignoutBtn onClick={() => dispatch(clearUser())}>
                Sign Out
              </SignoutBtn>
            )}
            {location.pathname === '/' && (
              <>
                <IconButton
                  size="large"
                  aria-label="show cart items"
                  color="inherit"
                  onClick={() => dispatch(toggleCart())}
                >
                  <Badge badgeContent={0} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{display: {xs: 'none', sm: 'block'}}}
                >
                  ${estimatedTotal?.toFixed(2)}
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>

        {isExpanded && <Cart />}

        {/* Mobile: search bar on second level */}
        <Box
          sx={{
            display: {xs: 'flex', sm: 'none'},
            padding: '8px 16px',
            backgroundColor: alpha('#ffffff', 0.1),
          }}
        >
          <Search>
            <StyledInputBase
              placeholder="Search"
              inputProps={{'aria-label': 'search'}}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
