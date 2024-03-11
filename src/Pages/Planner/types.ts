import { IPlannerDetail } from "../../Component/Planner";

export interface IPlannerState {
  id: number;
  name: string;
  age: string;
}

export interface IPlannerItemProps {
  handleEditPlanner: (
    name: keyof IPlannerDetail,
    value: any,
    id: number
  ) => void;
  plannerItem: IPlannerDetail;
  tempId: number;
  handleRemoveItem: (id: number) => void;
  isOpacityEnabled?: boolean
  isDragging?: boolean
}
export interface IPlannerProps {
  planner: any;
  handleEditPlanner: (
    name: keyof IPlannerDetail,
    value: any,
    id: number
  ) => void;
  handleRemoveItem: (id: number) => void;

}
export const ServicedBy = [
  {
    name: "Customer Fleet",
  },
  { name: "SMA Fleet" },
];
export const AllowMultiple = [
  { name: "Yes", value: true },
  { name: "No", value: false },
];
export const ParallerPickUp = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
];
export const AttendantSheet = [
  { name: "0" },
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" },
];
export const stretchers = [
  { name: "0" },
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
];
export const Acuity = [
  { name: "A" },
  { name: "B" },
  { name: "C" },
  { name: "D" },
  { name: "E" },
  { name: "F" },
  { name: "G" },
  { name: "H" },
  { name: "I" },
  { name: "J" },
  { name: "K" },
  { name: "L" },
];
