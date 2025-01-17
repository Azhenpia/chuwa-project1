import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {
  Grid,
  Button,
  Menu,
  MenuItem,
  Box,
  Pagination,
  Typography,
} from '@mui/material';
import ProductCard from '../../features/products/ProductCard';
import {
  useFetchProductsQuery,
  useUpdateCartMutation,
} from '../../features/api/apiSlice';
import {useSelector} from 'react-redux';

const style = {
  productGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '16px',
  },
};

function Product() {
  const {items} = useSelector((state) => state.cart);
  const {data, error, isLoading, refetch} = useFetchProductsQuery({});
  const [updateCart] = useUpdateCartMutation();
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState('Price: low to high');
  //const [currentPage, setCurrentPage] = useState(1);
  
  const [sortedProducts, setSortedProducts] = useState([]);
  const itemsPerPage = 12;

  const location = useLocation(); // 获取整个 location 对象
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 1; // 从查询参数获取页码，默认为1
  const [currentPage, setCurrentPage] = useState(initialPage);//lz
  useEffect(() => {
    if (location.state?.updated) {
      refetch(); // 重新获取数据
    }
  }, [location.state]);

  useEffect(() => {
    if (error) {
      navigate('/error', {state: {hasError: true}});
    }
  }, [error, navigate]);

  useEffect(() => {
    if (data && data.products) {
      if (items) {
        const cartMap = new Map(
          items.map((item) => [item.product._id, item.quantity])
        );
        let trans = data.products.map((product) => ({
          ...product,
          quantity: cartMap.get(product._id) || 0,
        }));
        setSortedProducts(trans);
      }
    }
  }, [data, items]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    navigate(`?page=${value}`); // 更新查询参数lz
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    if (option) {
      setSortOption(option);
    }
    let sortedProducts = [...data.products];
    if (option === 'Price: low to high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'Price: high to low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === 'Last added') {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    setCurrentPage(1);
    setSortedProducts(sortedProducts);
    setAnchorEl(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.products || data.products.length === 0) {
    return <div>No products available.</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        width: '100%',
        height: {xs: 'auto', sm: '750px'},
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'start',
        padding: '0 50px',
      }}
    >
      <Box sx={{mt: 4, width: '100%', height: '100%', position: 'relative'}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            gap: '16px', //  调整排序框和按钮之间的间距
            flexDirection: {xs: 'column', sm: 'row'},
          }}
        >
          <Typography variant="h4">Products</Typography>
          {/* ---------------- */}
          <Box
            sx={{
              display: 'flex',
              gap: '8px', //  设置排序框和按钮之间的距离
              alignItems: 'center',
            }}
          >
            <Button
              aria-controls="sort-menu"
              aria-haspopup="true"
              onClick={handleSortClick}
            >
              {sortOption}
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleSortClose()}
            >
              <MenuItem onClick={() => handleSortClose('Last added')}>
                Last added
              </MenuItem>
              <MenuItem onClick={() => handleSortClose('Price: low to high')}>
                Price: low to high
              </MenuItem>
              <MenuItem onClick={() => handleSortClose('Price: high to low')}>
                Price: high to low
              </MenuItem>
            </Menu>
            {currentUser?.role === 'admin' && (
              <Button
                variant="contained"
                onClick={() => {
                  navigate('/create-product');
                }}
                sx={{backgroundColor: '#5048E5'}}
              >
                Add Product
              </Button>
            )}
          </Box>
          {/* -------------- */}
        </Box>
        <Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(6, 1fr)',
              },
              gap: 2,
              marginTop: 2,
              justifyItems: 'center',
              justifyContent: {xs: 'center', sm: 'left'},
            }}
          >
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            mt: 4,
            position: {xs: 'static', sm: 'absolute'},
            bottom: '40px',
            right: '0',
            display: {xs: 'flex'},
            justifyContent: {xs: 'center'},
          }}
        >
          <Pagination
            count={Math.ceil(sortedProducts.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Product;
