import Header from "../../Component/Header";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddPlanner from "../AddPlanner/AddPlanner";
import { IPlannerDetail, dummyObject } from "../../Component/Planner";

  
const Home = () => {
  const navigate = useNavigate();
  const [pageLoad,setPageLoad]=useState(true)
  const [plannerItem,setPlannerItem]=useState<IPlannerDetail[]>([dummyObject])
  const [dummyObjectCount, setDummyObjectCount] = useState(1);
  const handleClick = async() => {
    
    await handleAddDummyObject()
    setPageLoad(false)
  };
  const handleAddDummyObject = () => {
    setDummyObjectCount(prevCount => prevCount + 1);
    generateDummyObjects(dummyObjectCount)
  };
  const generateDummyObjects = (count:number) => {
    const dummyObjects = [];
    for (let i = 0; i < count; i++) {
      const newDummyObject = dummyObject
      dummyObjects.push(newDummyObject);
    }
    setPlannerItem(dummyObjects)
    return dummyObjects;
  };
  const handleCancelFunction=()=>{
    setPageLoad(true)
    setPlannerItem([dummyObject]);
    console.log(plannerItem)
  }
  const handleSaveFunction =()=>{
    
  }
  return (
    <div className="App">
      <Header></Header>
      <div>
        {pageLoad ?(
        <span >
          <h3>Planners</h3>
          <p style={{ fontSize: 12 }}>
            Add Planner to allow customers to schedule their own trips. Each
            planner represent a virtual vehicle that limits the numbre and type
            of transfers that can be scheduled
          </p>
        </span>)
        :(<AddPlanner plannerItem={plannerItem}/>)}
        <div>

          <AddCircleOutlineIcon
            color="primary"
            fontSize="small"
            onClick={handleClick}
          ></AddCircleOutlineIcon>
          <span
            style={{ color: "blue", fontSize: 15, margin: 10, marginTop: 0 }}
          >
            Add New Planner
          </span>
        </div>
        <Button variant="contained" style={{ margin: 8, padding: 5 }}
        onClick={handleSaveFunction}>
          <span style={{ color: "white", fontWeight: "bold" }}>Save</span>
        </Button>

        <Button
          variant="contained"
          style={{ margin: 8, padding: 5 }}
          color="inherit"
          onClick={handleCancelFunction}
        >
          <span style={{ color: "black", fontWeight: "bold" }}>Cancel</span>{" "}
        </Button>
      </div>
    </div>
  );
};

export default Home;
