

import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import AddPlanner from "./AddPlanner/AddPlanner";
import Home from "./Home/Home";

const Sidebar = () => {
    return(
      <Router>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/NewPlanner" element={<AddPlanner plannerItem={undefined}/>} />
            
          </Routes>
        </div>
      </div>
    </Router>

    );

}
export default Sidebar;

