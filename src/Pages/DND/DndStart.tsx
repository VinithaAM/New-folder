import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import React, { useState } from "react";
import Dndsortcolumn from "./Dndsortcolumn";
import { Container } from "@mui/material";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

const Dndstart = () => {
  const item = [
    { id: 1, title: "itm1" },
    { id: 2, title: "itm2" },
    { id: 3, title: "itm3" },
    { id: 4, title: "itm" },
  ];
  const [tasks, setTasks] = useState(item);
  const getPostion = (id: any) => item.findIndex((x) => x.id == id);
  const handleDrag = (event: any) => {
    const { active, over } = event;
    if (active.id == over.id) return;
    setTasks((task) => {
      const original = getPostion(active.id);
      const newPostion = getPostion(over.id);
      return arrayMove(task, original, newPostion);
    });
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <Container>
      <DndContext
         sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDrag}
      >
        <Dndsortcolumn task={tasks} />
      </DndContext>
    </Container>
  );
};

export default Dndstart;
