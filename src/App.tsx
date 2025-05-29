import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Scan from "./components/Scan";
import Manage from "./components/layouts/manage/Manage";
import BottomNav from "./components/layouts/BottomNav";

export default function App() {
  return (
    <Router>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "black",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1, overflow: "hidden", paddingBottom: "56px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/scan" replace />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/manage" element={<Manage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}
