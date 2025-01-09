import FilledBtn from "../../components/FilledBtn";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthForm.css";

export default function UpdatePasswordPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/update-password/sent", { state: { emailSent: true } });
  };

  return (
    <form className="auth-form update-form" onSubmit={handleSubmit}>
      <h1>Update your password</h1>
      <p id="recovery-text">Enter your email link, we will send you the recovery link</p>
      <div className="input-field">
        <label>Email</label>
        <InputField />
      </div>
      <div className="submit-btn">
        <FilledBtn text="Update password" width="100%" type="submit" />
      </div>
    </form>
  );
}
