import { useLocation, useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md z-50">
      <div className="flex justify-around items-center h-16">
        <button
          className={`flex flex-col items-center justify-center text-sm transition-colors ${
            location.pathname === "/scan"
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => navigate("/scan")}
        >
          Scan
        </button>

        <button
          className={`flex flex-col items-center justify-center text-sm transition-colors ${
            location.pathname === "/manage"
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => navigate("/manage")}
        >
          Manage
        </button>
      </div>
    </div>
  );
}
