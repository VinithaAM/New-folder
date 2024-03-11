
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login"
import Index from "./Planner/index"

const Sidebar = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "10px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/NewPlanner" element={<Index />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
export default Sidebar;
