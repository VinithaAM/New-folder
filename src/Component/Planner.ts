import DateTime from "react-datetime";

export interface IPlannerHeader extends CommonFields {
    id:number;
    plannerName:string;
}
export interface IPlannerDetail extends CommonFields{
    tempId:number;
    id:number;
    headerId:number;
    name:string;
    schedulingLeadtime:number;
    attendantSheet:number;
    stretchers:number;
    acuity:string;
    isMultiLoad:boolean;
    servicedBy:string;
    isParalllelPickup:number;
    sequence:number
}
export interface CommonFields{
    createdBy:number;
    createdDatetime:  Date;
    modifiedBy:number;
    modifiedDatetime:Date;
    deletedBy:number;
    deletedDatetime: Date;
}
export const dummyObject = {
    tempId:0,
    id: 1,
    headerId: 1,
    name: 'Dummy Name',
    schedulingLeadtime: 10,
    attendantSheet: 2,
    stretchers: 1,
    acuity: 'A',
    isMultiLoad: true,
    servicedBy: 'Customer Feet',
    isParalllelPickup: 1,
    sequence: 1,
    createdBy:1,
    createdDatetime:new Date(),
    modifiedBy:1,
    modifiedDatetime:new Date(),
    deletedBy:1,
    deletedDatetime:new Date(),
};