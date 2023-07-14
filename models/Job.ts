import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IJob } from "../interfaces/IJob";

const JobSchema: Schema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  employeeEmail: {
    type: String,
  },

  employeeName: {
    type: String,
  },
  jobDiscription: {
    type: String,
    requirede: true,
  },
  jobExperience: {
    type: String,
    requirede: true,
  },
  jobLocation: {
    type: String,
    requirede: true,
  },
  jobTitle: {
    type: String,
    requirede: true,
  },
  paymentDetails: {
    type: String,
    requirede: true,
  },

  jobId: {
    type: String,
    requirede: true,
  },
  contractType: {
    type: String,
    requirede: true,
  },
  email: {
    type: String,
    requirede: true,
  },
  employeeCode: {
    type: String,
    requirede: true,
  },
  employeeEntity: {
    type: String,
    requirede: true,
  },
  employeeType: {
    type: String,
    requirede: true,
  },
  fname: {
    type: String,
    requirede: true,
  },

  location: {
    type: String,
    requirede: true,
  },
  ordinaryWorkDay: {
    type: String,
    requirede: true,
  },
  payRate: {
    type: String,
    requirede: true,
  },
  primaryManager: {
    type: String,
    requirede: true,
  },
  probationLength: {
    type: String,
    requirede: true,
  },
  sdate: {
    type: String,
    requirede: true,
  },
  secondaryManager: {
    type: String,
    requirede: true,
  },
  teams: {
    type: String,
    requirede: true,
  },
  isPanding:{
    type:Boolean,
    default: true,
  },
  workHours:{
    type:String,
    default:"0"
  },
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

JobSchema.pre<IJob>("save", async function (next) {
  // const Job = this;
  // if (Job.isModified("password")) {
  //   Job.password = await bcryptjs.hash(Job.password, salt);
  // }
  next();
});

JobSchema.post<IJob>("save", function () {
  logging.info("Mongo", "New Job just saved: ");
});

export default mongoose.model<IJob>("Job", JobSchema);
