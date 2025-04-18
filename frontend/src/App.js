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
//-----------------------------------------------------------------------------------------
// import "./App.css";
// import { styled } from "@mui/material/styles";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import React, { useState } from 'react';
// import { Button, Box, Typography } from '@mui/material';
// import { FullscreenExit } from "@mui/icons-material";
// import { blue } from "@mui/material/colors";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });
// export default function App() {
    
//     const [fileName, setFileNames] = useState([]);
  
//     const handleFileChange = (event) => {
//       const files = Array.from(event.target.files).map((file) => file.name);
//       setFileNames(files);
//     };

//   return (
//     <div className="App"  style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       marginTop: '50px',
//     }}>
//       <h1>Visa Status Management</h1>

//       <div >
//         <span style={{width:'30%',fontSize:'25px',color:'blue',fontWeight: 'bold',textAlign: 'center'}}>OPT Receipt</span>
//         <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
//         <Typography variant="body2">
//             {fileName}
//           </Typography>
//       <Button
//         component="label"
//         role={undefined}
//         variant="contained"
//         tabIndex={-1}
//         startIcon={<CloudUploadIcon />}
//       >
//         Upload files
//         <VisuallyHiddenInput
//           type="file"
//           onChange={handleFileChange}
//           multiple
//         />
         
//       </Button>
//       </div>
//       </div>
//     </div>
//   );
// }

// Import necessary libraries


// Helper function for dialog confirmation
