import Header from "../Component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Planner from "../Pages/Planner";
import Login from "../Pages/Login/Login";

const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/NewPlanner" element={<Planner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
