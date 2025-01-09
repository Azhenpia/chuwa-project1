import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import UpdatePasswordPage from "./pages/Auth/UpdatePasswordPage";
import PasswordSentPage from "./pages/Auth/PasswordSentPage";
import CreateProductPage from "./pages/Product/CreateProductPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/update-password/sent" element={<PasswordSentPage />} />
        <Route path="create-product" element={<CreateProductPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
