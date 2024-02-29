import React from 'react'
import "./Common.css";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";

const DndEnd =({id,title}:any) =>{
  const { attributes, transform, transition, listeners, setNodeRef } =
  useSortable({ id: id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} {...attributes}{...listeners} style={style}className='task'>
      <input type="checkbox" className='checkbox'></input>
      {title}
    </div>
  )
}

export default DndEnd;
