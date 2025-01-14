import "./App.css";
import { styled } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Box from "@mui/material/Box";
import Product from "./pages/Product/Product";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import UpdatePasswordPage from "./pages/Auth/UpdatePasswordPage";
import PasswordSentPage from "./pages/Auth/PasswordSentPage";
import CreateUpdateProductPage from "./pages/Product/CreateProductPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import ProductDetailPage from './pages/Product/ProductDetailsPage';

const AppContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#f9fafb",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  marginTop: "0 auto",
  flexGrow: 1,
  padding: theme.spacing(2), // 16px
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // justifyContent: "left", alignItems: "start"
}));

function App() {
  return (
    <AppContainer>
      <Router>
        <Header />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route
              path="/update-password/sent"
              element={<PasswordSentPage />}
            />
            <Route element={<ProtectedRoute/>}>
              <Route path="/create-product" element={<CreateUpdateProductPage isEdit={false}/>}/>
              <Route path="/edit-product/:id" element={<CreateUpdateProductPage isEdit={true}/>} />
            </Route>
            <Route path="/product-detail/:id" element={<ProductDetailPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ContentWrapper>
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;
