import { useState, useEffect } from "react";
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
  Button,
  CircularProgress,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import "../../styles/Product.css";
import { styled } from "@mui/material/styles";
import { useCreateProductMutation, useUpdateProductMutation } from "../../features/api/apiSlice";
import { useNavigate, useLocation } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreateUpdateProductPage({isEdit}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    imgUrl: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({
    name: { hasError: false, errContent: "" },
    description: { hasError: false, errContent: "" },
    category: { hasError: false, errContent: "" },
    price: { hasError: false, errContent: "" },
    stock: { hasError: false, errContent: "" },
    imgUrl: { hasError: false, errContent: "" },
  });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating}] = useUpdateProductMutation();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log(product)
    if (isEdit && product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
      });
      setImagePreview(product.imgUrl);
    }
  }, [isEdit, product]);

  const validateField = (name, value) => {
    if (name === "price" || name === "stock") {
      if (isNaN(value) || value <= 0) {
        return { hasError: true, errContent: `${name} not valid` };
      }
    } else {
      if (!value || value.trim() === "") {
        return { hasError: true, errContent: `${name} required` };
      }
    }
    return { hasError: false, errContent: "" };
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "price" || field === "stock") {
      setFormData((prev) => ({
        ...prev,
        [field]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
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
        if (isEdit) {
          const updatedProduct = {
            id: product._id, 
            ...formData,    
          };
          await updateProduct(updatedProduct).unwrap();
          console.log("Product updated:", formData);
        } else {
          await createProduct(formData).unwrap();
          console.log("Product created:", formData);
        }
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.log("Product creation / update error " + err.message);
        navigate("/error", {
          state: {
            hasError: "true",
            message: { err },
          },
        });
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          imgUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({
        ...prev,
        imgUrl: { hasError: false, errContent: "" },
      }));
    }
  };

  return success ? (
    <div>
      <h3>{isEdit ? "Product updated" : "Product created"} successfully! Redirecting to home page...</h3>
    </div>
  ) : (
    <div className="create-product-page">
      <h1>{isEdit ? "Edit Product" : "Create Product"}</h1>
      <form className="product-form" onSubmit={handleSubmit}>
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
                <FormHelperText
                  style={{ fontSize: "14px", textAlign: "right" }}
                >
                  {errors.category.errContent}
                </FormHelperText>
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
              disabled
              fullWidth
              value={formData.imgUrl}
              onChange={handleChange("imgUrl")}
              error={errors.imgUrl.hasError}
              helperText={errors.imgUrl.errContent}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginTop: "10px" }}>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      sx={{
                        width: "90px",
                        height: "40px",
                        margin: 0,
                        fontSize: "14px",
                        textTransform: "none",
                        backgroundColor: "#5048E5",
                        color: "white !important",
                      }}
                    >
                      Upload
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </InputAdornment>
                ),
                style: { fontSize: "16px" },
              }}
              FormHelperTextProps={{
                style: { fontSize: "14px", textAlign: "right" },
              }}
              sx={{
                ...(errors.imgUrl.hasError && {
                  "& fieldset": {
                    borderColor: "#d4342c !important",
                  },
                }),
              }}
            />
          </div>
        </div>
        <div className="img-preview">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          ) : (
            <>
              <ImageIcon style={{ color: "#E5E5E5", fontSize: "50px" }} />
              <p>Image Preview</p>
            </>
          )}
        </div>
        <div className="submit-btn">
          <FilledBtn
            text={isCreating || isUpdating ? <CircularProgress size={20} /> : isEdit ? "Update Product" : "Add Product"}
            width="160px"
            type="submit"
            disabled={isCreating || isUpdating}
          />
        </div>
      </form>
    </div>
  );
}
