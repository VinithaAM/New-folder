import axios from "axios";
const baseURL="https://localhost:7033/api"

export const createNewPlanner = (savePlanner: any) => {
  return axios.post(`${baseURL}/Planner/Create`, savePlanner);
};
