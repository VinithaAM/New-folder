import { Box, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React,{useState} from "react";
import { Acuity, AllowMultiple, AttendantSheet, IPlannerItemProps, ParallerPickUp, ServicedBy, stretchers } from "./types";
import TextField from '@mui/material/TextField';
import OutlinedInput from "@mui/material/OutlinedInput";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const PlannerItem = ({ handleEditPlanner, plannerItem }: IPlannerItemProps) => {
    const [acuity, setAcuity] = useState<string[]>([]);
    const[name,setName]=useState('')
    const [scheduleLeadTime, setSchesuleLeadTime] = useState();

    const handleAcuityChange = (event: SelectChangeEvent<typeof acuity>) => {
        const {
          target: { value },
        } = event;
        setAcuity(typeof value === "string" ? value.split(",") : value);
        console.log(acuity);
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
  return (
    
        <div style={{ borderLeft: "30px solid #004ed6",marginLeft:80,marginTop:10 }}>
            <Grid container alignItems="center" spacing={1} marginTop={5} marginBottom={2} >  
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
                  height: 10,
                  backgroundColor: "#F6F6F6",
                  borderBlockWidth: 1,
                  borderRadius: 5,
                  marginBottom:1
                }}
                size="small"
                type="text"
                onChange={(e) =>
                    handleEditPlanner("name", name, plannerItem.tempId)
                  }
                name="name"
                value={name}
                onInput={handleNameChange}
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
                width: 500,
                height: 10,
                backgroundColor: "#F6F6F6",
                textAlign: "left",
                borderBlockWidth: 1,
                borderRadius: 5,
                marginTop:10,
                marginBottom:10
                
              }}
              size="small"
              type="number"
              id="inputPassword5"
              placeholder="Minutes"
              aria-placeholder="right"
              name="scheduleLeadTime"
              aria-label="Minutes"
              label="Minutes"
            //   value={scheduleLeadTime}
              onChange={(e) =>
                handleEditPlanner("schedulingLeadtime", e.target.value, plannerItem.tempId)
              }
              
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
                marginTop:15
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="attendentSeat"
              onChange={(e) =>
                handleEditPlanner("attendantSheet", e.target.value, plannerItem.tempId)
              }
            >
                {AttendantSheet.map((item,index)=>(
                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                ))}
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
              name="stretchers"
              
              onChange={(e) =>
                handleEditPlanner("stretchers", e.target.value, plannerItem.tempId)
              }
            >
                 {stretchers.map((item,index)=>(
                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                ))}
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
              name="acuity"
              value={acuity}
              input={<OutlinedInput label="Name" />}
              onChange={
                handleAcuityChange
              }
              onClick={(e) =>
                handleEditPlanner("acuity", (acuity.toString()), plannerItem.tempId)}
            >
                 {Acuity.map((name,index) => (
            <MenuItem
              key={index}
              value={name.name}
            >
              {name.name}
            </MenuItem>
          ))}
             
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
              name="isMultiLoad"
              label="MultiLoad Allowed"
              onChange={(e) =>
                handleEditPlanner("isMultiLoad", (e.target.value), plannerItem.tempId)
              }
            >
                {AllowMultiple.map((item, index) => (
        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
      ))}
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
              name="servicedBy"
              label="ServicedBy"
              onChange={(e) =>
                handleEditPlanner("servicedBy", (e.target.value), plannerItem.tempId)
              }
            >
              {ServicedBy.map((item, index) => (
        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
      ))}
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
              name="isParalllelPickup"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
             
              label="Parallel Pickups"
              onChange={(e) =>
                handleEditPlanner("isParalllelPickup", (e.target.value), plannerItem.tempId)
              }
            >
                {ParallerPickUp.map((item,index)=>(
                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                ))}
            </Select>
          </Grid>
         
        </Grid>
        </div>
   
  );
};

export default PlannerItem;


{/* <input
name={"name"}
value={plannerItem.name}
onChange={(e) =>
  handleEditPlanner("name", e.target.value, plannerItem.id)
}
/>
<input
name={"age"}
value={plannerItem.name}
onChange={(e) =>
  handleEditPlanner("acuity", e.target.value, plannerItem.id)
}
/> */}