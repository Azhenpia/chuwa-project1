import { useLocation, useNavigate, Navigate } from "react-router-dom";
import FilledBtn from "../components/FilledBtn";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state?.hasError) {
    return <Navigate to="/" />;
  }

  return (
    <div className="error-page">
      <ErrorOutlineIcon style={{ color: "#5048e5", fontSize: "100px" }} />
      <h1>Oops, something went wrong!</h1>
      <FilledBtn
        text="Go Home"
        width="300px"
        type="submit"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}
