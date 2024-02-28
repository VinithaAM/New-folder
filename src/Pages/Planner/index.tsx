import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { IPlannerState } from "./types";
import PlannerItem from "./PlannerItem";
import AddPlanner from "../AddPlanner/AddPlanner";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IPlannerDetail, IPlannerHeader, dummyObject } from "../../Component/Planner";
import { createNewPlanner } from "../../Services/Planner";

const plannerState = {
  name: "",
  age: "",
  id: 0,
};

const Planner = () => {
  const [planner, setPlanner] = useState<IPlannerDetail[]>([]);
  const [pageLoad, setPageLoad] = useState(true);
  const [seqCount,setCount]=useState(0)

  const handleAddNewPlanner = () => {
    setPageLoad(false)
    setPlanner([
      ...planner,
      { ...dummyObject, tempId: Math.floor(Math.random() * 100),sequence:seqCount+1 },
    ]);
    setCount(seqCount+1)
  };

  const handleEditPlanner = (field: string, value: any, id: number) => {
    console.log(field,value,id)
    setPlanner((p) => {
        console.log(p,)
      const newPlannerArray: IPlannerDetail[] = p.map((item) => {
        if (item.tempId === id) {
          return { ...item, [field]: value };
        }
        return item;
      });
      console.log(planner)
      return newPlannerArray;
     
    });
  };
  const handleCancelFunction = () => {
    // const newArray = [...plannerItem];
    // const removedItem = newArray.pop();
    // setPlannerItem([]);
    // setDummyObjectCount(1);

    setPageLoad(true);
    // console.log(plannerItem);
  };
  const handleSaveFunction = () => {
 
    const savePlanner={
        id:0,
        plannerName:"New Planner",
        createdDatetime:new Date(),
        createdBy:1,
        plannerDetail:planner
    }
    console.log("save",savePlanner)
    createNewPlanner(savePlanner).then((result)=>
    {
        if(result.data.status==="Success"){
            setPlanner([])
            setPageLoad(true)
        }
        
    }).catch((error)=>{
        console.log(error)
    })
  };
  return (
    <Stack spacing={3}>
          <div>
        {pageLoad ? (
          <>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginLeft: 80,
              }}
            >
              Planners
            </h3>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginLeft: 80,
              }}
            >
              <p style={{ fontSize: 16, textAlign: "left" }}>
                Add Planner to allow customers to schedule their own trips. Each
                planner represent a virtual vehicle that limits the number and
                type of transfers that can be scheduled
              </p>
            </span>
          </>
        ) : (
            <div>
            {planner.map((item) => {
                return (
                <PlannerItem
                    key={item.id}
                    plannerItem={item}
                    handleEditPlanner={handleEditPlanner}
                />
                );
            })}
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <span style={{ marginLeft: 80 }}>
            <AddCircleOutlineIcon
              color="primary"
              fontSize="small"
              onClick={handleAddNewPlanner}
            ></AddCircleOutlineIcon>
          </span>
          <span
            style={{
              color: "#004ed6",
              fontSize: 15,
              fontWeight: "600",
              margin: 10,
              marginTop: 0,
              textAlign: "left",
            }}
          >
            Add New Planner
          </span>
        </div>
        <hr />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            marginLeft: 80,
          }}
        >
          <Button
            variant="contained"
            style={{ margin: 8, padding: 5, backgroundColor: "#004ed6" }}
           onClick={handleSaveFunction}
          >
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
      
    </Stack>
  );
};

export default Planner;
