import { Box, Button, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { IPlannerState } from "./types";
import PlannerItem from "./PlannerItem";
import AddPlanner from "../AddPlanner/AddPlanner";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IPlannerDetail, IPlannerHeader, dummyObject } from "../../Component/Planner";
import { createNewPlanner } from "../../Services/Planner";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const plannerState = {
  name: "",
  age: "",
  id: 0,
};

const Planner = () => {
  const [planner, setPlanner] = useState<IPlannerDetail[]>([]);
  const [pageLoad, setPageLoad] = useState(false);
  const [seqCount,setCount]=useState(0)

  const handleAddNewPlanner = () => {
    setPageLoad(true)
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
    setPlanner([]);
    setPageLoad(true);
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
  const getPostion=(id:any)=>planner.findIndex(x=>x.tempId==id)
  const handleDrag=(event:any)=>{
    const {active,over}=event
    if(active.tempId==over.tempId)return
    setPlanner(planner=>{
      const original=getPostion(active.tempId)
      const newPostion=getPostion(over.tempId)
      return arrayMove(planner,original,newPostion)
    })
  }
  const sensors=useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor,{
      coordinateGetter : sortableKeyboardCoordinates,
    })
  );
  const handleRemoveItem = (id: number) => {
    // console.log(id)
    setPageLoad(false)
    const indexToRemove = planner.findIndex(item => item.tempId === id);
    console.log(indexToRemove)
    if (indexToRemove !== -1) {
      planner.splice(indexToRemove, 1);
    }
    setPlanner(planner)
    setPageLoad(true)
    console.log(planner)
  }
  return (
    <Stack spacing={3}>
          <div>
       
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
       {pageLoad && (
          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDrag}>
            <div>
             
            {planner.map((item) => {
                return (
                  <SortableContext items={planner} strategy={verticalListSortingStrategy}>
                    <>
                     <IconButton
           size="large"
           aria-label="account of current user"
           aria-controls="menu-appbar"
           aria-haspopup="true"
            edge="end"
            style={{color:"blue"}}
            sx={{ mr: 1 }}
            onClick={()=>handleRemoveItem(item.tempId)}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
           size="large"
           aria-label="account of current user"
           aria-controls="menu-appbar"
           aria-haspopup="true"
            edge="start"
            style={{color:"blue"}}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
                <PlannerItem
                    key={item.id}
                    plannerItem={item}
                    handleEditPlanner={handleEditPlanner}
                />
                </>
                 </SortableContext>
                );
            })}
           
          </div>
          </DndContext>
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
              color: "#0049A3",
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
            style={{ margin: 8, padding: 5, backgroundColor: "#0049A3" }}
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
