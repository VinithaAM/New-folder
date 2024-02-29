import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React from 'react'
import DndEnd from './DndEndcolumn';
import { Container } from '@mui/material';
import "./Common.css"

 
export interface IPlannerState {
  id:number,
  title:string;
}
interface componentNameProps {
  task:IPlannerState[]
}

const Dndsort = ({task}:any) => {
    
  return (
    <div className='column' >
      <SortableContext
                      items={task}
                      strategy={verticalListSortingStrategy}
                     
                    >
      {task.map((a:any)=>
       <DndEnd id={a.id} title={a.title} key={a.id}/>
       )}
        </SortableContext>
       {/* 
                      
                    </SortableContext> */}
    </div>
  )
}

export default Dndsort;
