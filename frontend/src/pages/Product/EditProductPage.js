import { useState ,useEffect} from "react"; 
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

import { useFetchProductsQuery, useUpdateProductMutation } from '../../features/api/apiSlice'; 
import "../../styles/Product.css";
import { useLocation } from 'react-router-dom';

export default function EditProductPage() { 
  const { data, error, isLoading } = useFetchProductsQuery({});

  const location = useLocation();
  const { product } = location.state; // 解构获取传递的 product
  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    category: product.category || "electronics",
    price: product.price || "",
    stock: product.stock || "",
    imageUrl: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category,
        price: product.price || "",
        stock: product.stock || "",
        imageUrl: product.imgUrl || "",
      });
    }
  }, [product]);

  const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation(); // **绿色** 添加 Mutation 钩子

  const [errors, setErrors] = useState({
    name: { hasError: false, errContent: "" },
    description: { hasError: false, errContent: "" },
    category: { hasError: false, errContent: "" },
    price: { hasError: false, errContent: "" },
    stock: { hasError: false, errContent: "" },
    imageUrl: { hasError: false, errContent: "" },
  });

  const validateField = (name, value) => {
    if (typeof value !== "string") {
      value = String(value || ""); // 如果 value 是 null/undefined，转为空字符串
    }
    
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

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error.hasError);

    if (!hasErrors) {
      try {
        console.log("Submitting form:", formData); 
        const response = await updateProduct({ id: product.id, ...formData }).unwrap(); 
        console.log("Product updated successfully:", response); 
      } catch (error) {
        console.error("Failed to update product:", error); 
      }
    }
  };

  const handleImageUpload = () => {
    // Image upload logic here
  };

  return (
    <div className="create-product-page">
      <div className="product-form">
        <h1>Edit Product</h1> 
        <p>商品id: {JSON.stringify(product)}</p>
        <p>formData是: {JSON.stringify(formData)}</p>
        {isUpdating && <p>Updating product...</p>}
        {updateError && <p style={{ color: "red" }}>Error: {updateError.message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="info-input">
            <label>Product Name</label>
            <TextField
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
                  <MenuItem value="Kitchenware">Kitchenware</MenuItem>
                </Select>
                {errors.category.hasError && (
                  <FormHelperText style={{ fontSize: "14px", textAlign: "right" }}>{errors.category.errContent}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="info-input">
              <label>Price</label>
              <TextField
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
              <TextField
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
            <FilledBtn text="Edit Product" width="150px" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
