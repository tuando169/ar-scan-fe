import { useLocation, useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 backdrop-blur-lg bg-opacity-80 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        <button
          className={`flex flex-col items-center justify-center px-4 sm:px-6 py-2 rounded-lg transition-all ${
            location.pathname === "/scan"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => navigate("/scan")}
        >
          <span className="text-sm font-medium">Scan</span>
        </button>

        <button
          className={`flex flex-col items-center justify-center px-4 sm:px-6 py-2 rounded-lg transition-all ${
            location.pathname === "/manage"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => navigate("/manage")}
        >
          <span className="text-sm font-medium">Manage</span>
        </button>
      </div>
    </div>
  );
}