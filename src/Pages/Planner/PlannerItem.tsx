import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import {
  Acuity,
  AllowMultiple,
  AttendantSheet,
  IPlannerItemProps,
  ParallerPickUp,
  ServicedBy,
  stretchers,
} from "./types";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "./index.css";


const PlannerItem = ({
  handleRemoveItem,
  handleEditPlanner,
  plannerItem,
  tempId,
}: IPlannerItemProps) => {
  const { attributes, transform, transition, listeners, setNodeRef } =
  useSortable({ id: tempId });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const [acuity, setAcuity] = useState<string[]>([]);
  const [name, setName] = useState("");
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
    <div ref={setNodeRef}  style={style} >
      <div>
        <Box display="flex">
          <Box {...attributes}{...listeners}
            display="flex"
            flexDirection={"column"}
            justifyContent={"space-between"}
            bgcolor={'primary.main'}
            maxWidth={'40px'}
          >
            <div style={{ flex: 1 }}>
              <IconButton color="warning" onClick=
              {(e) =>
                handleRemoveItem(plannerItem.tempId)
              }>
                <CloseIcon />
              </IconButton>
            </div>
            <div style={{ flex: 1 }}>
              <IconButton color="warning" >
                <MenuIcon />
              </IconButton>
            </div>
          </Box>

          <Grid
            container
            alignItems="center"
            spacing={0.5}
            margin={0.5}
            // marginBottom={2}
            lineHeight={1}
            border={1}
            borderColor="#EEEFE9"
          >
            <Grid item xs={6}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
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
                  width: "100%",
                  height: 30,
                  backgroundColor: "#EEEFE9",
                  // borderBlockWidth: 1,
                  // borderRadius: 5,
                  // marginBottom: 1,
                }}
                size="small"
                type="text"
                onChange={(e) =>
                  handleEditPlanner("name", e.target.value, plannerItem.tempId)
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
                  marginLeft: 5,
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
                  width: "100%",
                  height: 30,
                  backgroundColor: "#EEEFE9",
                  textAlign: "left",
                  // borderBlockWidth: 1,
                  // borderRadius: 5,
                   marginTop: 10,
                  // marginBottom: 15,
                }}
                size="small"
                type="number"
                id="inputPassword5"
                placeholder="Minutes"
                aria-placeholder="right"
                name="scheduleLeadTime"
                aria-label="Minutes"
                //label="Minutes"
                   //value={scheduleLeadTime}
                //onInput={handleScheduleTime}
                onChange={(e) =>
                  handleEditPlanner(
                    "schedulingLeadtime",
                    e.target.value,
                    plannerItem.tempId
                  )
                }
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
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
                  width: "100%",
                  height: 30,
                  backgroundColor: "#EEEFE9",
                  textAlign: "left",
                  marginTop: 10,
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="attendentSeat"
                onChange={(e) =>
                  handleEditPlanner(
                    "attendantSheet",
                    e.target.value,
                    plannerItem.tempId
                  )
                }
              >
                {AttendantSheet.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
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
                  marginLeft: 5,
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
                  width: "100%",
                  height: 30,
                  backgroundColor: "#EEEFE9",
                  textAlign: "left",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="stretchers"
                onChange={(e) =>
                  handleEditPlanner(
                    "stretchers",
                    e.target.value,
                    plannerItem.tempId
                  )
                }
              >
                {stretchers.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
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
                  marginLeft: 5,
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
                  width: "100%",
                  height: 30,
                  backgroundColor: "#EEEFE9",
                  textAlign: "left",
                }}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                name="acuity"
                value={acuity}
                input={<OutlinedInput label="Name" />}
                onChange={handleAcuityChange}
                onClose={(event) =>
                  handleEditPlanner('acuity', acuity.toString(), plannerItem.tempId)
                }
                onClick={(e) =>
                  handleEditPlanner(
                    "acuity",
                    acuity.toString(),
                    plannerItem.tempId
                  )
                }
              >
                {Acuity.map((name, index) => (
                  <MenuItem key={index} value={name.name}>
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
                  marginLeft: 5,
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
                  width: "100%",
                  height: 30,
                  backgroundColor: "#EEEFE9",
                  textAlign: "left",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="isMultiLoad"
                label="MultiLoad Allowed"
                onChange={(e) =>
                  handleEditPlanner(
                    "isMultiLoad",
                    e.target.value,
                    plannerItem.tempId
                  )
                }
              >
                {AllowMultiple.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
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
                  marginLeft: 5,
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
                  width: "100%",
                  height: 30,
                  backgroundColor: "#EEEFE9",
                  textAlign: "left",
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="servicedBy"
                label="ServicedBy"
                onChange={(e) =>
                  handleEditPlanner(
                    "servicedBy",
                    e.target.value,
                    plannerItem.tempId
                  )
                }
              >
                {ServicedBy.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
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
                  marginLeft: 5,
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
                  width: "100%",
                  height: 30,
                  backgroundColor: "#EEEFE9",
                  textAlign: "left",
                }}
                name="isParalllelPickup"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Parallel Pickups"
                onChange={(e) =>
                  handleEditPlanner(
                    "isParalllelPickup",
                    e.target.value,
                    plannerItem.tempId
                  )
                }
              >
                {ParallerPickUp.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Box>
        </div>
    </div>
  );
};

export default PlannerItem;

