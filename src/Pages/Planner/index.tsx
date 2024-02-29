import { Alert, Box, Button, Container, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { IPlannerState } from "./types";
import PlannerItem from "./PlannerItem";
import AddPlanner from "../AddPlanner/AddPlanner";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  IPlannerDetail,
  IPlannerHeader,
  dummyObject,
} from "../../Component/Planner";
import { createNewPlanner } from "../../Services/Planner";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Dndstart from "../DND/DndStart";
import Planners from "./Planners";

const Planner = () => {
  
  const [planner, setPlanner] = useState<IPlannerDetail[]>([]);
  const [pageLoad, setPageLoad] = useState(false);
  const [seqCount, setCount] = useState(0);
  const [id, setId] = useState(0);

  const handleAddNewPlanner = () => {
    setPageLoad(true);
    setPlanner([
      ...planner,
      { ...dummyObject, tempId: id + 1, sequence: seqCount + 1 },
    ]);
    setCount(seqCount + 1);
    setId(id + 1);
  };

  const handleEditPlanner = (field: string, value: any, id: number) => {
    console.log(field, value, id);
    setPlanner((p) => {
      console.log(p);
      const newPlannerArray: IPlannerDetail[] = p.map((item) => {
        if (item.tempId === id) {
          return { ...item, [field]: value };
        }
        return item;
      });
      console.log("Planner", planner);
      return newPlannerArray;
    });
  };
  const handleCancelFunction = () => {
    setPlanner([]);
    setPageLoad(true);
  };
  const handleSaveFunction = () => {
    console.log("new",planner)
    if(planner.length>0){
      const savePlanner = {
        id: 0,
        plannerName: "New Planner",
        createdDatetime: new Date(),
        createdBy: 1,
        plannerDetail: planner,
      };
      createNewPlanner(savePlanner)
        .then((result) => {
          if (result.data.status === "Success") {
            setPlanner([]);
            setPageLoad(true);
            setCount(0);
            setId(0)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else{
      
      alert("No item Added")
    }
   
  };
  const getPostion = (id: any) => planner.findIndex((x) => x.tempId == id);
  const setSequence= (id:any)=>planner.find((x)=>x.sequence==id)
  const handleDrag = (event: any) => {
    const { active, over } = event;
    if(active?.id !==undefined && over?.id !==undefined && active?.id !==null && over?.id !==null){
      if (active.id == over.id) return;
      setPlanner((planner) => {
        const original = getPostion(active.id);
        const newPostion = getPostion(over.id);
        const sequence =setSequence(over.id)
        return arrayMove(planner, original, newPostion);
      });
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
  );
  const handleRemoveItem = (id: number) => {
    setPlanner((prevPlanner) => {
      const indexToRemove = prevPlanner.findIndex((item) => item.tempId === id);
      if (indexToRemove !== -1) {
        const newPlanner = [...prevPlanner.slice(0, indexToRemove), ...prevPlanner.slice(indexToRemove + 1)];
        return newPlanner;
      }
      return prevPlanner;
    });
  };
  
  return (
    <Container>
      <Stack spacing={2}>
        <div>
          <>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              Planners
            </h3>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <p style={{ fontSize: 15, textAlign: "left",color:"gray" }}>
                Add Planner to allow customers to schedule their own trips. Each
                planner represent a virtual vehicle that limits the number and
                type of transfers that can be scheduled
              </p>
            </span>
          </>
          {pageLoad && (
            // <Dndstart planner={planner}
            //              handleEditPlanner={handleEditPlanner}
            //             handleRemoveItem={handleRemoveItem} />
            <>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragEnd={handleDrag}
             >
              <Planners planner={planner}handleEditPlanner={handleEditPlanner}
              handleRemoveItem={handleRemoveItem}/>
              </DndContext>
              </>
           
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Button
              variant="text"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddNewPlanner}
            >
              Add New Planner
            </Button>
          </div>
          <hr />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Button color="primary"
              variant="contained"
              style={{ margin: 8, padding: 5,width:"12%" }}
              onClick={handleSaveFunction}
             
            >
              <span style={{ color: "white", fontWeight: "100%",fontFamily:"sans-serif" }}>Save</span>
            </Button>

            <Button
              variant="contained"
              style={{ margin: 8, padding: 5,width:"12%" }}
              color="inherit"
              onClick={handleCancelFunction}
            >
              <span style={{ color: "black", fontWeight: "bold" }}>Cancel</span>{" "}
            </Button>
          </div>
        </div>
      </Stack>
    </Container>
  );
};

export default Planner;
