import { Document } from "mongoose"


export interface IJob extends Document {
    uid: string;
    employeeEmail: string;
    employeeName: string;
    jobDiscription: string;
    jobExperience: string;
    jobLocation: string;
    //
    paymentDetails: string;
    jobId: string;
    contractType: string;
    email: string;
    employeeCode: string;
    employeeEntity: string;
    employeeType: string;
    fname: string;
    jobTitle: string;
    location: string;
    ordinaryWorkDay: string;
    payRate: string;
    primaryManager: string;
    probationLength: string;
    sdate: string;
    secondaryManager: string;
    teams: string;
    isPanding?: boolean;
    workHours?: string;
  }