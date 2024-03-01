import {
  Box,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import { useState } from "react";
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
import { useDraggable } from "@dnd-kit/core";

const PlannerItem = ({
  handleRemoveItem,
  handleEditPlanner,
  plannerItem,
  tempId,
}: IPlannerItemProps) => {
  const { attributes, transform, listeners, setNodeRef } =
  useSortable({ id: tempId });
  const style = {
    transform: CSS.Transform.toString(transform),
  };
  const [acuity, setAcuity] = useState<string[]>([]);
  const [name, setName] = useState("");

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
    }
  };
 
  return (
    <div draggable ref={setNodeRef} style={style}>
      <div>
        <Box display="flex">
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent={"space-between"}
            bgcolor={"primary.main"}
            maxWidth={"40px"}
          >
            <div style={{ flex: 1 }}>
              <IconButton
                color="warning"
                onClick={(e) => handleRemoveItem(plannerItem.tempId)}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div style={{ flex: 1 }}>
              <IconButton color="warning" {...attributes} {...listeners}>
                <MenuIcon />
              </IconButton>
            </div>
          </Box>
        
          <Grid
            container
            alignItems="center"
             spacing={0.25}
           // margin={0.5}
            // marginBottom={2}
            //lineHeight={1}
            border={0.5}
            borderColor="#EEEFE9"
          >
            <Grid item xs={6}   style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
                }}
                component={"p"}
              >
                
                Name
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
              
            </Grid>

            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#d6d3ce",borderTop:"1px solid",
                  borderTopColor:"#d6d3ce"}} bgcolor={"#d6d3ce"}>
            
              <TextField
                style={{
                  width: "100%",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce"
                 
                }}
                required={true}
                
                type="text"
                onChange={(e) =>
                  handleEditPlanner("name", e.target.value, plannerItem.tempId)
                }
                name="name"
                value={name}
                onInput={handleNameChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    }
                  }
                }}
              />
            </Grid>
                  
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
                }}
                component={"p"}
              >
                Scheduling Lead time
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
              
            </Grid>
            <Grid item xs={6}  style={{borderBottom:"1px solid",
                  borderBottomColor:"#d6d3ce",borderTop:"1px solid",
                  borderTopColor:"#d6d3ce"}} bgcolor={"#d6d3ce"}>
              <TextField
                style={{
                  width: "100%",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                  textAlign: "left",
                  //marginTop: 8,

                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    }
                  }
                }}
                type="number"
                
                InputProps={{
                  endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                }}
                name="scheduleLeadTime"
                aria-label="Minutes"
                
                id="input-with-icon-textfield"
                onChange={(e) =>
                  handleEditPlanner(
                    "schedulingLeadtime",
                    e.target.value,
                    plannerItem.tempId
                  )
                }
              />
              
            </Grid>
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
                }}
                component={"p"}
              >
                Attendant Seats
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
              
            </Grid>
            <Grid item xs={6}  style={{borderBottom:"1px solid",
                  borderBottomColor:"#d6d3ce",borderTop:"1px solid",
                  borderTopColor:"#d6d3ce"}} bgcolor={"#d6d3ce"}>
              <Select
                style={{
                  width: "100%",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                  borderTopColor:"#d6d3ce",
                  textAlign: "left",
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    }
                  }
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
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
                }}
                component={"p"}
              >
                Stretchers
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
              
            </Grid>
            <Grid item xs={6}  style={{borderBottom:"1px solid",
                  borderBottomColor:"#d6d3ce",borderTop:"1px solid",
                  borderTopColor:"#d6d3ce"}} bgcolor={"#d6d3ce"}>
              <Select
                style={{
                  width: "100%",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
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
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    }
                  }
                }}
              >
                {stretchers.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
             
            </Grid>
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
                }}
                component={"p"}
              >
                Acuity
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
             
            </Grid>
            <Grid item xs={6}   style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",borderTop:"1px solid",
                  borderTopColor:"#d6d3ce"}} bgcolor={"#d6d3ce"}>
              <Select
                style={{
                  width: "100%",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                  textAlign: "left",
                }}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                name="acuity"
                value={acuity}
                input={<OutlinedInput label="Name" />}
                renderValue={(selected) => selected.join(', ')}
                onChange={handleAcuityChange}
                onClose={(event) =>
                  handleEditPlanner(
                    "acuity",
                    acuity.toString(),
                    plannerItem.tempId
                  )
                }
                onClick={(e) =>
                  handleEditPlanner(
                    "acuity",
                    acuity.toString(),
                    plannerItem.tempId
                  )
                }
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    }
                  }
                }}
              >
                {Acuity.map((name, index) => (
                  <MenuItem key={index} value={name.name}>
                    <ListItem>
              <Checkbox checked={acuity.indexOf(name.name) > -1} />
              <ListItemText primary={name.name} />
              </ListItem>
                  </MenuItem>
                ))}
              </Select>
            
            </Grid>
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
                }}
                component={"p"}
              >
                MultiLoad Allowed?
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
            
            </Grid>
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#d6d3ce",borderTop:"1px solid",
                  borderTopColor:"#d6d3ce"}} bgcolor={"#d6d3ce"}>
              <Select
                style={{
                  width: "100%",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                  textAlign: "left",
                }}
                labelId="demo-simple-select-standard"
                id="demo-simple-select-standard"
                name="isMultiLoad"
                label="MultiLoad Allowed"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    }
                  }
                }}
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
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
                }}
                component={"p"}
              >
                Serviced By
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
            
            </Grid>
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#d6d3ce",borderTop:"1px solid",
                  borderTopColor:"#d6d3ce"}} bgcolor={"#d6d3ce"}>
              <Select
                style={{
                  width: "100%",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  textAlign: "left",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce"
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
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    }
                  }
                }}
              >
                {ServicedBy.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
             
            </Grid>
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                style={{
                  color: "#040404",
                  fontFamily: "sans-serif",
                  textAlign: "left",
                  marginLeft: 5,
                }}
                component={"p"}
              >
                Parallel Pickups/Dropoffs
                <InfoOutlinedIcon
                  style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
                />
              </InputLabel>
             
            </Grid>
            <Grid item xs={6}  style={{borderBottom:"1px solid",borderBottomColor:"#d6d3ce",borderTop:"1px solid",
                 borderTopColor:"#d6d3ce"}}bgcolor={"#d6d3ce"} >
              <Select
                style={{
                  width: "100%",
                  textAlign: "left",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce"
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    }
                  }
                }}
                name="isParalllelPickup"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Parallel Pickups"
                variant="outlined"
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
