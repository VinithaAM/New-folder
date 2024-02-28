import axios from "axios";
import { IPlannerHeader } from "../Component/Planner";

export const createNewPlanner=(savePlanner:any)=>{
    return axios.post("https://localhost:7033/api/Planner/Create",savePlanner);
}