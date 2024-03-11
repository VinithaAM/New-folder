import { Button, Stack } from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IPlannerDetail, dummyObject } from "../../Component/Planner";
import { createNewPlanner } from "../../Services/Planner";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "react-toastify/dist/ReactToastify.css";
import Planners from "./Planners";
import { Droppable } from "../../Component/Droppable";
import { Draggable } from "../../Component/Draggable";
import PlannerItem from "./PlannerItem";
import Header from "../../Component/Header";

const Planner = () => {
  const [planner, setPlanner] = useState<IPlannerDetail[]>([]);
  const [pageLoad, setPageLoad] = useState(false);
  const [seqCount, setCount] = useState(0);
  const [id, setId] = useState(0);
  const [isDropped, setIsDropped] = useState(false);
  const [activeItem, setActiveItem] = useState<IPlannerDetail>();

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
    let shouldSave = true;
    if (planner.length > 0) {
      planner.forEach((element) => {
        if (
          element.name !== "" &&
          element.schedulingLeadtime !== 0 &&
          element.acuity !== "" &&
          element.stretchers !== 0
        ) {
          
        } else {
          shouldSave=false
          
        }
      
      });
    } else {
      toast('No item Added!');
    }
    if(shouldSave && planner.length>0){
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
            setId(0);
          }
        })
        .catch((error) => {
          console.log(error);
          toast(error.message)
        });

    }
    else if(planner.length>0){
      toast("Name,Scheduling Lead time,Acuity,Streachers, please fill above mentioned fields...")
    }
  };
  const getPostion = (id: any) => planner.findIndex((x) => x.tempId === id);
  const setSequence = (id: any) => planner.find((x) => x.sequence === id);
  const handleDrag = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const activeItem = planner.find((item) => item.tempId === active.id);
    const overItem = planner.find((item) => item.tempId === over.id);

    if (!activeItem || !overItem) {
      return;
    }
    const activeIndex = planner.findIndex((item) => item.tempId === active.id);
    const overIndex = planner.findIndex((item) => item.tempId === over.id);

    if (activeIndex !== overIndex) {
      setPlanner((planner) => arrayMove(planner, activeIndex, overIndex));
    }
    setActiveItem(undefined);
    // const { active, over } = event;
    // if (
    //   active?.id !== undefined &&
    //   over?.id !== undefined &&
    //   active?.id !== null &&
    //   over?.id !== null
    // ) {
    //   if (active.id === over.id) return;
    //   setPlanner((planner) => {
    //     const original = getPostion(active.id);
    //     const newPostion = getPostion(over.id);
    //     return arrayMove(planner, original, newPostion);
    //   });
    // }
  };
  const handleDragCancel = () => {
    setActiveItem(undefined);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleRemoveItem = (id: number) => {
    setPlanner((prevPlanner) => {
      const indexToRemove = prevPlanner.findIndex((item) => item.tempId === id);
      if (indexToRemove !== -1) {
        const newPlanner = [
          ...prevPlanner.slice(0, indexToRemove),
          ...prevPlanner.slice(indexToRemove + 1),
        ];
        return newPlanner;
      }
   return prevPlanner;
    });
    console.log("preview",planner)
  };

  const handleDragStart = (event: any) => {
    const { active } = event;

    setActiveItem(planner.find((item) => item.tempId === active.id));
  };
  return (
    <>
    <Header />
    <div style={{ margin: 50, marginLeft: 50 }}>
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
              <p style={{ fontSize: 15, textAlign: "left", color: "gray" }}>
                Add Planner to allow customers to schedule their own trips. Each
                planner represent a virtual vehicle that limits the number and
                type of transfers that can be scheduled
              </p>
            </span>
          </>
          {pageLoad && (
            <>
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragCancel={handleDragCancel}
                onDragEnd={handleDrag}
                collisionDetection={closestCenter}
              >
                <Planners
                  planner={planner}
                  handleEditPlanner={handleEditPlanner}
                  handleRemoveItem={handleRemoveItem}
                />
                <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                  {activeItem ? (
                    <PlannerItem
                      plannerItem={activeItem}
                      handleEditPlanner={handleEditPlanner}
                      handleRemoveItem={handleRemoveItem}
                      tempId={activeItem.tempId}
                      isDragging
                    />
                  ) : null}
                </DragOverlay>
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
              style={{ textTransform: "capitalize" }}
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
              marginTop: 10,
            }}
          >
            <Button
              color="primary"
              variant="contained"
              style={{
                margin: 8,
                padding: 5,
                width: "12%",
                textTransform: "capitalize",
              }}
              onClick={handleSaveFunction}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: "100%",
                  fontFamily: "sans-serif",
                }}
              >
                Save
              </span>
            </Button>

            <Button
              variant="contained"
              style={{
                margin: 8,
                padding: 5,
                width: "12%",
                textTransform: "capitalize",
              }}
              color="inherit"
              onClick={handleCancelFunction}
            >
              <span style={{ color: "black", fontWeight: "bold" }}>Cancel</span>
            </Button>
          </div>
        </div>
        <ToastContainer
         className="toast-container"
         toastClassName="custom-toast"
         bodyClassName="custom-toast-body"
         progressClassName="custom-toast-progress" />
      </Stack>
    </div>
    </>
  );
};

export default Planner;
