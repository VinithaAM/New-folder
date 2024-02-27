
import Grid from "@mui/material/Grid";
import NewPlanner from "../../Component/NewPlanner";
interface componentNameProps {}

const AddPlanner = (props: componentNameProps) => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  return (
    <div className="container">
      <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xl={12} key={index}>
          <NewPlanner />
        </Grid>
         ))}
      </Grid>
    </div>
  );
};

export default AddPlanner;
