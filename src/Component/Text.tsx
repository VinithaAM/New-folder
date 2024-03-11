import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';
import { Box, Container, IconButton, InputLabel, Stack, TextField } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import OutlinedInput from "@mui/material/OutlinedInput";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const AppFile=()=> {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );
  
  return (

    <Stack spacing={1}>
        <Box  display="flex" sx={{mt: 1 }}>
            <IconButton>
            <MenuIcon />
            </IconButton>
            <IconButton >
            <MenuIcon />
            </IconButton>
        </Box>
        <Box  display="flex">
            <IconButton>
            <MenuIcon />
            </IconButton>
            <IconButton >
            <MenuIcon />
            </IconButton>
            <TextField></TextField>
        </Box>
        <Box  display="flex" borderBottom="1px solid">
            <IconButton>
            <MenuIcon />
            </IconButton>
            <IconButton >
            <MenuIcon />
            </IconButton>
            <TextField></TextField>
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
        </Box>
        <Box display={"flex"} flexDirection={"row"} style={{borderBottom:"1px solid",
                  borderBottomColor:"#d6d3ce",}}>
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
              <TextField
                style={{
                  width: "50%",
                  backgroundColor: "#EEEFE9",
                 alignItems:"flex-end"
                }}
                // InputProps={{ style: { backgroundColor: "#EEEFE9", borderColor:"transparent" } }}
                required={true}
                // variant="filled"
                type="text"
                // onChange={(e) =>
                //   handleEditPlanner("name", e.target.value, plannerItem.tempId)
                // }
                name="name"
                //value={name}
                //onInput={handleNameChange}
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
        </Box>
    </Stack>

  );
  
  function handleDragEnd(event:any) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
}
export default AppFile