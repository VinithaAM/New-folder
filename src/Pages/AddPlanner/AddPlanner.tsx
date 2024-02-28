
import Grid from "@mui/material/Grid";
import NewPlanner from "../../Component/NewPlanner";
import { IPlannerDetail, IPlannerHeader } from "../../Component/Planner";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface componentNameProps {
  plannerItem:IPlannerDetail
}

const AddPlanner:React.FC<{ plannerItem: any,setPlannerItem:any }> = ({plannerItem,setPlannerItem}) => {
  console.log("pla",plannerItem)
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  return (
    <div className="column" >
        
      <Grid container spacing={2} >
        {/* <SortableContext items={plannerItem} strategy={verticalListSortingStrategy}> */}
      {plannerItem.map((item:any, index:any) => (
       
        <Grid item xl={12} key={index}>
          <NewPlanner plannerItem={item} setPlannerItem={setPlannerItem} />
        </Grid>
 
         ))}
         {/* </SortableContext> */}
      </Grid>
    </div>
  );
};

export default AddPlanner;
