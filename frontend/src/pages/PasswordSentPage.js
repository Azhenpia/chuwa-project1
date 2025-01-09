import { useLocation, Navigate } from "react-router-dom";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import "../styles/AuthForm.css";

export default function PasswordSentPage() {
  const location = useLocation();

  if (!location.state?.emailSent) {
    return <Navigate to="/update-password" />;
  }

  return (
    <form className="recovery-link">
      <ForwardToInboxIcon style={{ color: "#5048e5", fontSize: "70px" }} />
      <p>
        We have sent the update password link to your email, please check that!
      </p>
    </form>
  );
}
