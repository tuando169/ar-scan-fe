import { useLocation, useNavigate } from "react-router-dom";
import "./BottomNav.css";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <button
        className={location.pathname === "/scan" ? "active" : ""}
        onClick={() => navigate("/scan")}
      >
        Scan
      </button>
      <button
        className={location.pathname === "/manage" ? "active" : ""}
        onClick={() => navigate("/manage")}
      >
        Manage
      </button>
    </div>
  );
}
