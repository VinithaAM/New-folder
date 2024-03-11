import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  RadioProps,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import { CSSProperties, HTMLAttributes, forwardRef, useState } from "react";

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
import PhoneNumber from 'libphonenumber-js';

const PlannerItem = ({
  handleRemoveItem,
  handleEditPlanner,
  plannerItem,
  tempId,
  isDragging,
  isOpacityEnabled
  
}:IPlannerItemProps) => {
  const { attributes,transform, listeners, setNodeRef } =
  useSortable({ id: tempId });
  console.log("activeItem",isDragging)
  const style:CSSProperties = {
    opacity: isDragging ? "0.5" : "1",
    cursor: isDragging ? "grabbing" : "grab",
    lineHeight: "0.5",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
   boxShadow: isDragging
    ? "none"
    : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
    //transform: CSS.Transform.toString(transform),
    filter: isDragging ? "blur(4px)" : "none",
    backdropFilter: "blur(5px)",
    backgroundColor: isDragging ?"rgba(0, 0, 0, 0.5)":"none",
  };
  const [acuity, setAcuity] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [scheduleLeadTime,setSchecduleLeadtime]=useState('')

  const handleAcuityChange = (event: SelectChangeEvent<typeof acuity>) => {
    const {
      target: { value },
    } = event;
    setAcuity(typeof value === "string" ? value.split(",") : value);
    console.log(acuity);
  };
  const handleNameChange = (event: any) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z ]*$/;
    if (regex.test(value) ) {
      setName(value);
    }
  };
  const handleScheduleTime = (event: any) => {
    const value = event.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      const length = value.slice(0, 9);
      setSchecduleLeadtime(length);
    }
  };
  function BpRadio(props: RadioProps) {
    console.log("bp",props)
    return (
      <Radio
        disableRipple
        color="default"
        // checkedIcon={<BpCheckedIcon />}
        // icon={<BpIcon />}
        {...props}
      />
    );
  }
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (event:any) => {
    const inputPhoneNumber = event.target.value;
    setPhoneNumber(inputPhoneNumber);
  };
  const formatPhoneNumber = (event:any) => {
    
    const formattedNumber = PhoneNumber(phoneNumber, 'AU')?.formatNational();
    console.log(formattedNumber)
    return formattedNumber;
  };
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState(Number);
  const calculateAge = (dob:any) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateChange = (event:any) => {
    const dob = event.target.value;
    setDateOfBirth(dob);
    const calculatedAge = calculateAge(dob);
    console.log(calculatedAge)
    setAge(calculatedAge);
  };
  return (
    <div ref={setNodeRef} style={{...style,
      backgroundColor: isDragging ? "GrayText" : "none", }}  >
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
              <IconButton color="warning" {...attributes} {...listeners} style={{
            borderRadius: "8px",
            boxShadow: isDragging
              ? "none"
              : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
            maxWidth: "100%",
            objectFit: "fill"
          }}>
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
             <input type="date" id="dob" value={dateOfBirth} onChange={handleDateChange} />
      {age !== null && (
        <p>Age: {age}</p>
      )}
             <RadioGroup
        defaultValue="female"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
      >
         <FormControlLabel value="female" control={<BpRadio />} label="Female" />
        <FormControlLabel value="male" control={<BpRadio />} label="Male" />
        <FormControlLabel value="other" control={<BpRadio />} label="Other" />
      </RadioGroup>
      <label>Phone Number:</label>
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        // Format the phone number with country code
        onBlur={(event) => formatPhoneNumber(event)}
      />
            <Grid item xs={6}    style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
               sx={{
                color: '#040404',
                fontFamily: 'sans-serif',
                textAlign: 'left',
                margin:0,
                marginLeft: 1,
                padding: '0px',
              }}
                // style={{
                //   height:"30px",
                //   color: "#040404",
                //   fontFamily: "sans-serif",
                //   textAlign: "left",
                //   marginLeft: 0,
                //   padding:0
                // }}
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
                  borderBottom:"0px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                 margin:0
                }}
                required={true}
                
                type="text"
                onChange={(e) =>
                  handleEditPlanner("name", e.target.value, plannerItem.tempId)
                }
                inputProps={{ maxLength: 100,padding: 0, }}
                name="name"
                value={name}
                onInput={handleNameChange}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "1px solid black",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0"
                  }
                  },
             
                }}
              />
            </Grid>
                  
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                  sx={{
                    color: '#040404',
                    // fontFamily:"Calibri (Body)",
                    fontFamily: 'sans-serif',
                    textAlign: 'left',
                    margin:0,
                    marginLeft: 1,
                    padding: '0px',
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
                  borderBottom:"0px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"2px solid",
                 borderTopColor:"#d6d3ce",
                  textAlign: "left",
                  margin:0,
                  backgroundColor:"#d6d3ce"
                  //marginTop: 8,

                }}
                
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "1px solid black"
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0"
                  }
                  }
                }}
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                  inputProps: {
                    maxLength: 9
                  }
                }}
                inputProps={{
                  maxLength: 9, // Set maxLength here
                }}
                name="scheduleLeadTime"
                aria-label="Minutes"
                value={scheduleLeadTime}
                id="input-with-icon-textfield"
                onChange={(e) =>
                  handleEditPlanner(
                    "schedulingLeadtime",
                    scheduleLeadTime,
                    plannerItem.tempId
                  )
                }
                onInput={handleScheduleTime}
              />
              
            </Grid>
            <Grid item xs={6} style={{borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",}}>
              <InputLabel
                sx={{
                  color: '#040404',
                  fontFamily: 'sans-serif',
                  textAlign: 'left',
                  margin:0,
                  marginLeft: 1,
                  padding: '0px',
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
                  height:"30px",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                  borderTopColor:"#d6d3ce",
                  textAlign: "left",
                  padding: "0" 
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    },
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
                  sx={{
                    color: '#040404',
                    fontFamily: 'sans-serif',
                    textAlign: 'left',
                    margin:0,
                    marginLeft: 1,
                    padding: '0px',
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
                  height:"30px",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                  textAlign: "left",
                  padding:0
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
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0"
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
                  sx={{
                    color: '#040404',
                    fontFamily: 'sans-serif',
                    textAlign: 'left',
                    margin:0,
                    marginLeft: 1,
                    padding: '0px',
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
                  height:"30px",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                  textAlign: "left",
                  padding:0
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
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0"
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
                   sx={{
                    color: '#040404',
                    fontFamily: 'sans-serif',
                    textAlign: 'left',
                    margin:0,
                    marginLeft: 1,
                    padding: '0px',
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
                  height:"30px",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                  textAlign: "left",
                  padding:0
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
                    },

                  }
                }}
                defaultValue={"No"}
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
                   sx={{
                    color: '#040404',
                    fontFamily: 'sans-serif',
                    textAlign: 'left',
                    margin:0,
                    marginLeft: 1,
                    padding: '0px',
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
                  height:"30px",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  textAlign: "left",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                 padding:0
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="servicedBy"
                label="ServicedBy"
                defaultValue={"SMA Fleet"}
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
                    },
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
                  sx={{
                    color: '#040404',
                    fontFamily: 'sans-serif',
                    textAlign: 'left',
                    margin:0,
                    marginLeft: 1,
                    padding: '0px',
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
                  height:"30px",
                  textAlign: "left",
                  borderBottom:"1px solid",
                  borderBottomColor:"#EEEFE9",
                  borderTop:"1px solid",
                 borderTopColor:"#d6d3ce",
                 padding:0
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "transparent"
                  },
        
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: "2px solid black"
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "0"
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
