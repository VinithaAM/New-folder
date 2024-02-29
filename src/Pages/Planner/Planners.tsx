import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Stack } from '@mui/material';
import React from 'react'
import PlannerItem from './PlannerItem';
import { IPlannerProps } from './types';

const Planners = ({planner,handleEditPlanner,handleRemoveItem}:IPlannerProps) => {
  return (
    <Stack spacing={2}>
       <SortableContext
                      items={planner}
                      strategy={verticalListSortingStrategy}
                    >
                {planner.map((item:any) => 
                
                  // return (
                        <PlannerItem
                        key={item.tempId}
                          tempId={item.tempId}
                          plannerItem={item}
                          handleEditPlanner={handleEditPlanner}
                          handleRemoveItem={handleRemoveItem}
                        />
                  // );
                )}
                 </SortableContext>
                
               </Stack>
  )
}

export default Planners
