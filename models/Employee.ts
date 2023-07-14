import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IEmployee } from "../interfaces/IEmployee";

const EmployeeSchema: Schema = new Schema({
  jobId: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  contractType: {
    type: String,
    required: true,
  },
  employeeEmail: {
    type: String,
    required: true,
  },
  employeeCode: {
    type: String,
    required: true,
  },
  employeeEntity: {
    type: String,
    required: true,
  },
  employeeType: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ordinaryWorkDay: {
    type: String,
    required: true,
  },
  payRate: {
    type: String,
    required: true,
  },
  primaryManager: {
    type: String,
    required: true,
  },
  probationLength: {
    type: String,
    required: true,
  },
  sdate: {
    type: String,
    required: true,
  },
  secondaryManager: {
    type: String,
    required: true,
  },
  teams: {
    type: String,
    required: true,
  },
  workHours: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  accountName:String,
  bsb:String,
  accountNumber:String,
  percentage: String,
  assignedContractor: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const salt = 10;

EmployeeSchema.pre<IEmployee>("save", async function (next) {
  // const Employee = this;
  // if (Employee.isModified("password")) {
  //   Employee.password = await bcryptjs.hash(Employee.password, salt);
  // }
  next();
});

EmployeeSchema.post<IEmployee>("save", function () {
  logging.info("Mongo", "New Employee just saved: ");
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
