import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IPlannerDetail } from "./Planner";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import CloseIcon from '@mui/icons-material/Close';

// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';

interface componentNameProps {
  plannerItem: IPlannerDetail;
}
const NewPlanner: React.FC<{
  plannerItem: IPlannerDetail;
  setPlannerItem: any;
}> = ({ plannerItem, setPlannerItem }) => {
  const tempId = plannerItem.tempId;
  // const sortableProps = useSortable({ id: plannerItem.tempId });
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   sortableProps;
  console.log("newplanner",plannerItem)
  const [name, setName] = useState("");
  const [scheduleLeadTime, setSchesuleLeadTime] = useState();
  const [attendentSeat, setAttendentSeat] = useState("");
  const [stretchers, setStretchers] = useState("");
  const [isMultiLoad, setIsMultiLoad] = useState("");
  const [acuity, setAcuity] = useState<string[]>([]);
  const [servicedBy, setServicedBy] = useState("");
  const [parallelPickups, setParallelPickups] = useState("");
  const [tasks, setTasks] = useState([plannerItem]);

  const handleAcuityChange = (event: SelectChangeEvent<typeof acuity>) => {
    const {
      target: { value },
    } = event;
    setAcuity(typeof value === "string" ? value.split(",") : value);
    console.log(acuity);
  };

  const handleAttendentChange = (event: SelectChangeEvent) => {
    setAttendentSeat(event.target.value);
    console.log(event.target.value);
    //plannerItem.attendantSheet = parseInt(event.target.value);
  };
  const handleStretchersChange = (event: SelectChangeEvent) => {
    setStretchers(event.target.value);
    //plannerItem.stretchers = parseInt(event.target.value);
  };
  const handleServicedByChange = (event: SelectChangeEvent) => {
    setServicedBy(event.target.value);
    //plannerItem.servicedBy = event.target.value;
  };
  const handleParallelPickup = (event: SelectChangeEvent) => {
    setParallelPickups(event.target.value);
    //plannerItem.isParalllelPickup = parseInt(event.target.value);
  };
  const handleMultiLoadChange = (event: SelectChangeEvent) => {
    setIsMultiLoad(event.target.value);
    if (event.target.value == "Yes") {
      //plannerItem.isMultiLoad = true;
    } else {
      //plannerItem.isMultiLoad = false;
    }
  };
  const handleNameChange = (event: any) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(value)) {
      setName(value);
      //plannerItem.name = value;
    }
  };
  const handleScheduleTime = (event: any) => {
    const value = event.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      const length = value.slice(0, 5);
      setSchesuleLeadTime(length);
      //plannerItem.schedulingLeadtime = length;
    }
  };
  const generateValueObject = () => {
    const Objects = [];
      console.log("planerItem",plannerItem)
    const dummyObject = {
      tempId: plannerItem.tempId,
      id: 0,
      headerId: 0,
      name: name,
      schedulingLeadtime: scheduleLeadTime,
      attendantSheet: attendentSeat,
      stretchers: stretchers,
      acuity: acuity,
      isMultiLoad: isMultiLoad ==="Yes"?true:false,
      servicedBy: servicedBy,
      isParalllelPickup: parallelPickups,
      sequence: plannerItem.sequence,
      createdBy: 1,
      createdDatetime: new Date(),
      modifiedBy: 1,
      modifiedDatetime: new Date(),
      deletedBy: 1,
      deletedDatetime: new Date(),
    };
    Objects.push(dummyObject);

    setPlannerItem(Objects)
    console.log("planerItem",plannerItem)
  };
  // ref={setNodeRef} {...attributes} {...listeners}
  return (
    <div >
      <DndContext collisionDetection={closestCorners}></DndContext>
     
      <div style={{ borderLeft: "50px solid #0049A3",marginLeft:80 }}>
      {/* <span>
        <CloseIcon  />
        </span> */}
        
        <Grid container alignItems="center" spacing={0.5} marginTop={5} marginBottom={2} >  
            <Grid item xs={6}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft:5,
                }}
              >
                Name
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
            </Grid>
         
         
            <Grid item xs={6}>
              <TextField
                style={{
                  width: 500,
                  height: 30,
                  backgroundColor: "#F6F6F6",
                  borderBlockWidth: 1,
                  borderRadius: 5,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                type="text"
                onChange={handleNameChange}
                value={name}
              />
            </Grid>
          
          <Grid item xs={6}>
            <InputLabel
              style={{
                color: "#040404",
                fontFamily: "sans-serif",
                textAlign: "left",
                marginLeft:5,
              }}
            >
              Scheduling Lead time
              <InfoOutlinedIcon
                style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
              />
            </InputLabel>
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{
                width: 30,
                height: 10,
                backgroundColor: "#F6F6F6",
                textAlign: "right",
                borderBlockWidth: 1,
                borderRadius: 5,
              }}
              type="number"
             
              placeholder="Minutes"
              label="Minutes"
              aria-placeholder="right"
              value={scheduleLeadTime}
              onChange={handleScheduleTime}
              
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              style={{
                color: "#040404",
                fontFamily: "sans-serif",
                textAlign: "left",
                marginLeft:5,
              }}
            >
              Attendant Seats
              <InfoOutlinedIcon
                style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
              />
            </InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              style={{
                width: 500,
                height: 30,
                backgroundColor: "#F6F6F6",
                textAlign: "left",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={attendentSeat}
              onChange={handleAttendentChange}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              style={{
                color: "#040404",
                fontFamily: "sans-serif",
                textAlign: "left",
                marginLeft:5,
              }}
            >
              Stretchers
              <InfoOutlinedIcon
                style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
              />
            </InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              style={{
                width: 500,
                height: 30,
                backgroundColor: "#F6F6F6",
                textAlign: "left",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stretchers}
              label="Stretchers"
              onChange={handleStretchersChange}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              style={{
                color: "#040404",
                fontFamily: "sans-serif",
                textAlign: "left",
                marginLeft:5,
              }}
            >
              Acuity
              <InfoOutlinedIcon
                style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
              />
            </InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              style={{
                width: 500,
                height: 30,
                backgroundColor: "#F6F6F6",
                textAlign: "left",
              }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={acuity}
              input={<OutlinedInput label="Name" />}
              onChange={handleAcuityChange}
            >
              <MenuItem value={"A"}>A</MenuItem>
              <MenuItem value={"B"}>B</MenuItem>
              <MenuItem value={"C"}>C</MenuItem>
              <MenuItem value={"D"}>D</MenuItem>
              <MenuItem value={"E"}>E</MenuItem>
              <MenuItem value={"F"}>F</MenuItem>
              <MenuItem value={"G"}>G</MenuItem>
              <MenuItem value={"H"}>H</MenuItem>
              <MenuItem value={"I"}>I</MenuItem>
              <MenuItem value={"J"}>J</MenuItem>
              <MenuItem value={"K"}>K</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              style={{
                color: "#040404",
                fontFamily: "sans-serif",
                textAlign: "left",
                marginLeft:5,
              }}
            >
              MultiLoad Allowed?
              <InfoOutlinedIcon
                style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
              />
            </InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              style={{
                width: 500,
                height: 30,
                backgroundColor: "#F6F6F6",
                textAlign: "left",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isMultiLoad}
              label="MultiLoad Allowed"
              onChange={handleMultiLoadChange}
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              style={{
                color: "#040404",
                fontFamily: "sans-serif",
                textAlign: "left",
                marginLeft:5,
              }}
            >
              Serviced By
              <InfoOutlinedIcon
                style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
              />
            </InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              style={{
                width: 500,
                height: 30,
                backgroundColor: "#F6F6F6",
                textAlign: "left",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={servicedBy}
              label="ServicedBy"
              onChange={handleServicedByChange}
            >
              <MenuItem value={"Customer Feet"}>Customer Feet</MenuItem>
              <MenuItem value={"SMA Feet"}>SMA Feet</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              style={{
                color: "#040404",
                fontFamily: "sans-serif",
                textAlign: "left",
                marginLeft:5,
              }}
            >
              Parallel Pickups/Dropoffs
              <InfoOutlinedIcon
                style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
              />
            </InputLabel>
          </Grid>
          <Grid item xs={6}>
            <Select
              style={{
                width: 500,
                height: 30,
                backgroundColor: "#F6F6F6",
                textAlign: "left",
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={parallelPickups}
              label="Parallel Pickups"
              onChange={handleParallelPickup}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NewPlanner;
