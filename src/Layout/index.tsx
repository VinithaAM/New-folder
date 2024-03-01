import Header from "../Component/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Planner from "../Pages/Planner";

const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Planner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
