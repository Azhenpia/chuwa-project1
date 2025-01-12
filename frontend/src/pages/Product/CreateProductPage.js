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
  FormHelperText,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import "../../styles/Product.css";

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "https://",
  });

  const [errors, setErrors] = useState({
    name: { hasError: false, errContent: "" },
    description: { hasError: false, errContent: "" },
    category: { hasError: false, errContent: "" },
    price: { hasError: false, errContent: "" },
    stock: { hasError: false, errContent: "" },
    imageUrl: { hasError: false, errContent: "" },
  });

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return { hasError: true, errContent: `${name} required` };
    }
    if (name === "price") {
      if (isNaN(value) || parseFloat(value) <= 0) {
        return { hasError: true, errContent: "Price Invalid" };
      }
    }
    if (name === "stock") {
      if (isNaN(value) || parseInt(value) < 0) {
        return { hasError: true, errContent: "Quantity Invalid" };
      }
    }
    if (name === "imageUrl") {
      if (formData.imageUrl === "" || formData.imageUrl === "https://") {
        return { hasError: true, errContent: "image required" };
      }
    }
    return { hasError: false, errContent: "" };
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error.hasError);

    if (!hasErrors) {
      console.log("Form submitted:", formData);
    }
  };

  const handleImageUpload = () => {
    // Image upload logic here
  };

  return (
    <div className="create-product-page">
      <div className="product-form">
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="info-input">
            <label>Product Name</label>
            <InputField
              value={formData.name}
              onChange={handleChange("name")}
              error={errors.name.hasError}
              helperText={errors.name.errContent}
            />
          </div>
          <div className="info-input">
            <label>Product Description</label>
            <TextField
              multiline
              rows={6}
              variant="outlined"
              fullWidth
              value={formData.description}
              onChange={handleChange("description")}
              error={errors.description.hasError}
              helperText={errors.description.errContent}
              InputProps={{
                style: { fontSize: "16px" }, 
              }}
              FormHelperTextProps={{
                style: { fontSize: "14px", textAlign: "right" }, 
              }}
            />
          </div>
          <div className="category-price">
            <div className="info-input">
              <label>Category</label>
              <FormControl
                fullWidth
                variant="outlined"
                error={errors.category.hasError}
              >
                <Select
                  labelId="category-label"
                  value={formData.category}
                  onChange={handleChange("category")}
                  input={<OutlinedInput />}
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="pets">Pets</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                </Select>
                {errors.category.hasError && (
                  <FormHelperText style={{ fontSize: "14px", textAlign: "right" }}>{errors.category.errContent}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="info-input">
              <label>Price</label>
              <InputField
                value={formData.price}
                onChange={handleChange("price")}
                error={errors.price.hasError}
                helperText={errors.price.errContent}
              />
            </div>
          </div>
          <div className="stock-img">
            <div className="info-input stock">
              <label>In Stock Quantity</label>
              <InputField
                value={formData.stock}
                onChange={handleChange("stock")}
                error={errors.stock.hasError}
                helperText={errors.stock.errContent}
              />
            </div>
            <div className="info-input image">
              <label>Add Image Link</label>
              <TextField
                variant="outlined"
                fullWidth
                value={formData.imageUrl}
                onChange={handleChange("imageUrl")}
                error={errors.imageUrl.hasError}
                helperText={errors.imageUrl.errContent}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FilledBtn
                        text="Upload"
                        width="90px"
                        onClick={handleImageUpload}
                      />
                    </InputAdornment>
                  ),
                  style: { fontSize: "16px" }, 
                }}
                FormHelperTextProps={{
                  style: { fontSize: "14px", textAlign: "right" }, 
                }}
              />
            </div>
          </div>
          <div className="img-preview">
            <ImageIcon style={{ color: "#E5E5E5", fontSize: "50px" }} />
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
