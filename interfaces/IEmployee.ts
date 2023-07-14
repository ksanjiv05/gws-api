import { Document } from "mongoose";

export interface IEmployee extends Document {
  jobId: string;
  uid: string;
  contractType: string;
  employeeEmail: string;
  employeeCode: string;
  employeeEntity: string;
  employeeType: string;
  employeeName: string;
  jobTitle: string;
  location: string;
  ordinaryWorkDay: string;
  payRate: string;
  primaryManager: string;
  probationLength: string;
  sdate: string;
  secondaryManager: string;
  teams: string;
  workHours: string;
  accountName:string;
  bsb:string;
  accountNumber:string;
  percentage: string;
  assignedContractor?: string;
}
