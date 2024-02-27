import DateTime from "react-datetime";

export interface IPlannerHeader extends CommonFields {
    id:number;
    plannerName:string;
}
export interface IPlannerDetail extends CommonFields{
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
    createdDatetime:string | DateTime;
    modifiedBy:number;
    modifiedDatetime:string |DateTime;
    deletedBy:number;
    deletedDatetime:string | DateTime;
}