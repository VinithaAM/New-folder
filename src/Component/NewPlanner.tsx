import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {  useState } from "react";
import Form from "react-bootstrap/Form";
import OutlinedInput from "@mui/material/OutlinedInput";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const NewPlanner = () => {
  const [name, setName] = useState("");
  const [scheduleLeadTime, setSchesuleLeadTime] = useState();
  const [attendentSeat, setAttendentSeat] = useState("");
  const [stretchers, setStretchers] = useState("");
  const [isMultiLoad, setIsMultiLoad] = useState("");
  const [acuity, setAcuity] = useState<string[]>([]);
  const [servicedBy, setServicedBy] = useState("");
  const [parallelPickups, setParallelPickups] = useState("");

  const handleAcuityChange = (event: SelectChangeEvent<typeof acuity>) => {
    const {
      target: { value },
    } = event;
    setAcuity(typeof value === "string" ? value.split(",") : value);
    console.log(acuity);
  };

  const handleAttendentChange = (event: SelectChangeEvent) => {
    setAttendentSeat(event.target.value);
  };
  const handleStretchersChange = (event: SelectChangeEvent) => {
    setStretchers(event.target.value);
  };
  const handleServicedByChange = (event: SelectChangeEvent) => {
    setServicedBy(event.target.value);
  };
  const handleParallelPickup = (event: SelectChangeEvent) => {
    setParallelPickups(event.target.value);
  };
  const handleMultiLoadChange = (event: SelectChangeEvent) => {
    setIsMultiLoad(event.target.value);
  };
  const handleNameChange = (event: any) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z]*$/;
    if (regex.test(value)) {
      setName(value);
    }
  };
  const handleScheduleTime = (event: any) => {
    const value = event.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      const length = value.slice(0, 5);
      setSchesuleLeadTime(length);
    }
  };
  return (
    <div className="container">
      <Grid container alignItems="center" spacing={0.5} margin={5}>
        <Grid item xs={6}>
          <InputLabel style={{ color: "#040404", fontFamily: "sans-serif" }}>
            Name
            <InfoOutlinedIcon
              style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Form.Control
            style={{ width: 500, height: 30, backgroundColor: "#F6F6F6",borderBlockWidth:1,borderRadius:5 }}
            maxLength={100}
            type="text"
            onChange={handleNameChange}
            value={name}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel style={{ color: "#040404", fontFamily: "sans-serif" }}>
            Scheduling Lead time
            <InfoOutlinedIcon
              style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Form.Control
            style={{
              width: 500,
              height: 30,
              backgroundColor: "#F6F6F6",
              textAlign: "right",
              borderBlockWidth:1,borderRadius:5
            }}
            type="number"
            id="inputPassword5"
            placeholder="Minutes"
            aria-placeholder="right"
            value={scheduleLeadTime}
            onChange={handleScheduleTime}
            maxLength={25}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel style={{ color: "#040404", fontFamily: "sans-serif" }}>
            Attendant Seats
            <InfoOutlinedIcon
              style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Select
            style={{ width: 500, height: 30, backgroundColor: "#F6F6F6" }}
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
          <InputLabel style={{ color: "#040404", fontFamily: "sans-serif" }}>
            Stretchers
            <InfoOutlinedIcon
              style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Select
            style={{ width: 500, height: 30, backgroundColor: "#F6F6F6" }}
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
          <InputLabel style={{ color: "#040404", fontFamily: "sans-serif" }}>
            Acuity
            <InfoOutlinedIcon
              style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Select
            style={{ width: 500, height: 30, backgroundColor: "#F6F6F6" }}
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
          <InputLabel style={{ color: "#040404", fontFamily: "sans-serif" }}>
            MultiLoad Allowed?
            <InfoOutlinedIcon
              style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Select
            style={{ width: 500, height: 30, backgroundColor: "#F6F6F6" }}
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
          <InputLabel style={{ color: "#040404", fontFamily: "sans-serif" }}>
            Serviced By
            <InfoOutlinedIcon
              style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Select
            style={{ width: 500, height: 30, backgroundColor: "#F6F6F6" }}
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
          <InputLabel style={{ color: "#040404", fontFamily: "sans-serif" }}>
            Parallel Pickups/Dropoffs
            <InfoOutlinedIcon
              style={{ marginLeft: 10, width: 15, color: "#217AC0" }}
            />
          </InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Select
            style={{ width: 500, height: 30, backgroundColor: "#F6F6F6" }}
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
  );
};

export default NewPlanner;
