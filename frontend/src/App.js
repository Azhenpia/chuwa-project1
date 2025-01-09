import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import PasswordSentPage from "./pages/PasswordSentPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/update-password/sent" element={<PasswordSentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
