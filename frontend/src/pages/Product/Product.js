import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';//
import {   Grid,
  Button,
  Menu,
  MenuItem,
  Box,
  Pagination,
  Typography, } from "@mui/material";
import ProductCard from "../../features/products/ProductCard";
import {useFetchProductsQuery, useUpdateCartMutation} from '../../features/api/apiSlice';
const style = {
  productGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: "16px",
  },
};


function Product() {
  const { data, error, isLoading } = useFetchProductsQuery({});
  const [updateCart] = useUpdateCartMutation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("Price: low to high");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState([]);
  const itemsPerPage = 12;

  useEffect(() => {
    if (data && data.products) {
      setSortedProducts(data.products);
    }
  }, [data]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    if (option) {
      setSortOption(option);
    }
    let sortedProducts = [...data.products];
    if (option === "Price: low to high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "Price: high to low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "Last added") {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
    <div>
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    gap: "16px", //  调整排序框和按钮之间的间距
          }}
        >
          <Typography variant="h4">Products</Typography>
          {/* ---------------- */}
          <Box
          sx={{
            display: "flex",
            gap: "8px", //  设置排序框和按钮之间的距离
            alignItems: "center",
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
            <MenuItem onClick={() => handleSortClose("Last added")}>
              Last added
            </MenuItem>
            <MenuItem onClick={() => handleSortClose("Price: low to high")}>
              Price: low to high
            </MenuItem>
            <MenuItem onClick={() => handleSortClose("Price: high to low")}>
              Price: high to low
            </MenuItem>
          </Menu>
          <Button variant="contained"  onClick={()=>{navigate('/create-product')}}>Add Product</Button>
          </Box>
          {/* -------------- */}
        </Box>
        <Box>
          <Box sx={style.productGrid} style={{ marginTop: "16px" }}>
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(sortedProducts.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </div>
  );

}

export default Product;
