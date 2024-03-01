export interface IPlannerHeader extends CommonFields, IPlannerDetail {
  id: number;
  plannerName: string;
}
export interface IPlannerDetail extends CommonFields {
  tempId: number;
  id: number;
  headerId: number;
  name: string;
  schedulingLeadtime: number;
  attendantSheet: number;
  stretchers: number;
  acuity: string;
  isMultiLoad: string;
  servicedBy: string;
  isParalllelPickup: number;
  sequence: number;
}
export interface CommonFields {
  createdBy: number;
  createdDatetime: Date;
  modifiedBy: number;
  modifiedDatetime: Date;
  deletedBy: number;
  deletedDatetime: Date;
}
export const dummyObject = {
  tempId: 0,
  id: 0,
  headerId: 0,
  name: "",
  schedulingLeadtime: 0,
  attendantSheet: 0,
  stretchers: 0,
  acuity: "",
  isMultiLoad: "",
  servicedBy: "",
  isParalllelPickup: 0,
  sequence: 0,
  createdBy: 1,
  createdDatetime: new Date(),
  modifiedBy: 1,
  modifiedDatetime: new Date(),
  deletedBy: 1,
  deletedDatetime: new Date(),
};
