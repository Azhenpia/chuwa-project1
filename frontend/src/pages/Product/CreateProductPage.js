import { useState } from "react";
import InputField from "../../components/InputField";
import FilledBtn from "../../components/FilledBtn";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import "../../styles/Product.css";

export default function CreateProductPage() {
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("https://");

  const handleButtonClick = () => {
    // setImageUrl("https://example.com/sample-image.jpg");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-product-page" onSubmit={handleSubmit}>
      <div className="product-form">
        <h1>Create Product</h1>
        <form>
          <div className="info-input">
            <label>Product Name</label>
            <InputField />
          </div>
          <div className="info-input">
            <label>Product Description</label>
            <TextField multiline rows={6} variant="outlined" fullWidth />
          </div>
          <div className="category-price">
            <div className="info-input">
              <label>Category</label>
              <FormControl fullWidth variant="outlined">
                <Select
                  labelId="category-label"
                  value={category}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput />}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="pets">Pets</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="info-input">
              <label>Price</label>
              <InputField />
            </div>
          </div>
          <div className="stock-img">
            <div className="info-input stock">
              <label>In Stock Quantity</label>
              <InputField />
            </div>
            <div className="info-input image">
              <label>Add Image Link</label>
              <TextField
                variant="outlined"
                fullWidth
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)} 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FilledBtn text="Upload" width="90px" onClick={handleButtonClick} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className="img-preview">
              <ImageIcon style={{ color: "#E5E5E5", fontSize: "50px" }}/>
              <p>Image Preview</p>
          </div>
          <div className="submit-btn">
            <FilledBtn text="Add Product" width="150px" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
