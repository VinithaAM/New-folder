
import Grid from "@mui/material/Grid";
import NewPlanner from "../../Component/NewPlanner";
import { IPlannerDetail, IPlannerHeader } from "../../Component/Planner";
interface componentNameProps {
  plannerItem:IPlannerDetail
}

const AddPlanner:React.FC<{ plannerItem: any }> = ({plannerItem}) => {
  console.log("pla",plannerItem)
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  return (
    <div className="container">
      <Grid container spacing={2}>
      {plannerItem.map((item:any, index:any) => (
        <Grid item xl={12} key={index}>
          <NewPlanner plannerItem={item}/>
        </Grid>
         ))}
      </Grid>
    </div>
  );
};

export default AddPlanner;
