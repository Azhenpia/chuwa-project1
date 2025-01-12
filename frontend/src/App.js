import './App.css';
import {styled} from '@mui/material/styles';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Box from '@mui/material/Box';
import ProductsPage from './pages/ProductsPage';
import Product from './pages/Product/Product';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import UpdatePasswordPage from './pages/Auth/UpdatePasswordPage';
import PasswordSentPage from './pages/Auth/PasswordSentPage';
import CreateProductPage from './pages/Product/CreateProductPage';
import ProtectedRoute from './components/ProtectedRoute';

const AppContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const ContentWrapper = styled(Box)(({theme}) => ({
  marginTop: '0 auto',
  flexGrow: 1,
  padding: theme.spacing(2), // 16px
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

function App() {
  return (
    <AppContainer>
      <Router>
        <Header />
        <ContentWrapper>
          <Routes>
            {/*<Route path="/" element={<ProductsPage />} />*/}
            <Route path="/" element={<Product />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute/>}>              
             {/* 之后可以把path"/"放进来 */}
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route
              path="/update-password/sent"
              element={<PasswordSentPage />}
            />
            <Route path="create-product" element={<CreateProductPage />} />
            </Route>
          </Routes>
        </ContentWrapper>
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;
