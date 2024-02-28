import Header from "../../Component/Header";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddPlanner from "../AddPlanner/AddPlanner";
import { IPlannerDetail, dummyObject } from "../../Component/Planner";
import { DndContext, closestCorners } from "@dnd-kit/core";

const Home = () => {
  const navigate = useNavigate();

  const [pageLoad, setPageLoad] = useState(true);
  const [plannerItem, setPlannerItem] = useState<IPlannerDetail[]>([]);
  const [dummyObjectCount, setDummyObjectCount] = useState(1);
  const [uniqueItems,setUniqueItems]=useState<any>([])
  const handleClick = async () => {
    await handleAddDummyObject();
    setPageLoad(false);
  };
  console.log("final", plannerItem);
  const handleAddDummyObject = () => {
    setDummyObjectCount((prevCount) => prevCount + 1);
    generateDummyObjects(dummyObjectCount);
  };
  const generateDummyObjects = (count: number) => {
    console.log("dumm", dummyObjectCount);
    const dummyObjects = [];
    for (let i = 0; i < count; i++) {
      const dummyObject = {
        tempId: i + 1,
        id: 0,
        headerId: 0,
        name: "Dummy Name",
        schedulingLeadtime: 10,
        attendantSheet: 2,
        stretchers: 1,
        acuity: "A",
        isMultiLoad: true,
        servicedBy: "Customer Feet",
        isParalllelPickup: 1,
        sequence: count,
        createdBy: 1,
        createdDatetime: new Date(),
        modifiedBy: 1,
        modifiedDatetime: new Date(),
        deletedBy: 1,
        deletedDatetime: new Date(),
      };
      dummyObjects.push(dummyObject);
    }
    setPlannerItem(dummyObjects)
    // const combinedItems = [...plannerItem, ...dummyObjects];
    // console.log("plan", combinedItems.length);
    // if (combinedItems.length > 1) {
    //   const Items = Array.from(
    //     new Set(combinedItems.map((item) => item.tempId))
    //   ).map((id) => combinedItems.find((item) => item.tempId === id));
    //   console.log("aaaaaa");
    //   setUniqueItems(Items);
    // } else {
    //   const newArray = uniqueItems.concat(dummyObjects);
    //   setUniqueItems(newArray);
    //   console.log("bbbbbb", uniqueItems, dummyObjects, newArray);
    // }
    // if (uniqueItems !== undefined) {
    //   setPlannerItem(uniqueItems);
    // } else {
    //   setPlannerItem([...dummyObjects]);
    // }

    return dummyObjects;
  };
  const handleCancelFunction = () => {
    const newArray = [...plannerItem];
    const removedItem = newArray.pop();
    setPlannerItem([]);
    setDummyObjectCount(1);

    setPageLoad(true);
    console.log(plannerItem);
  };
  const handleSaveFunction = () => {};
  return (
    <div className="App">
      <Header></Header>
      <DndContext collisionDetection={closestCorners}>
        {/* <AddPlanner plannerItem={plannerItem} setPlannerItem={setPlannerItem}/> */}
      </DndContext>
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
          <AddPlanner
            plannerItem={plannerItem}
            setPlannerItem={setPlannerItem}
          />
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
              onClick={handleClick}
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
    </div>
  );
};

export default Home;
