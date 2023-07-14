import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { IJob } from "../../interfaces/IJob";
import Job from "../../models/Job";

export const addJob = async (req: Request, res: Response) => {
  try {
    const {
      jobDiscription = "",
      jobExperience = "",
      jobLocation = "",
      jobTitle = "",
      paymentDetails = "",
    }: IJob = req.body;
    const { uid } = req.body.user;
    delete req.body._id
    if (
        jobDiscription == ""||
        jobExperience == ""||
        jobLocation == ""||
        jobTitle == ""||
        paymentDetails == ""
    ) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Job object",
        error: null,
        resObj: res,
        data: null,
      });
    }

    const newJob: IJob = new Job({ uid, ...req.body });
    await newJob.save();

    // add push notification to notify user
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully posted new Job",
      error: null,
      resObj: res,
      data: newJob,
    });
  } catch (error) {
    logging.error("Add Job", "unable to add Job", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};



export const getAllJobs = async (req: Request, res: Response) => {
    try {
      
      const jobs = await Job.find().sort({createdAt:-1}).limit(1);
    
      return responseObj({
        statusCode: HTTP_RESPONSE.SUCCESS,
        type: "success",
        msg: "your Jobs",
        error: null,
        resObj: res,
        data: jobs,
      });
    } catch (error) {
      logging.error("Get Jobs", "unaable to get Jobs", error);
      return responseObj({
        statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
        type: "error",
        msg: "unable to process your request",
        error: null,
        resObj: res,
        data: null,
      });
    }
  };


  
  export const getJobs = async (req: Request, res: Response) => {
    try {
      const { uid } = req.body.user;
      const jobs = await Job.find({ uid });
      return responseObj({
        statusCode: HTTP_RESPONSE.SUCCESS,
        type: "success",
        msg: "your Jobs",
        error: null,
        resObj: res,
        data: jobs,
      });
    } catch (error) {
      logging.error("Get Jobs", "unaable to get Jobs", error);
      return responseObj({
        statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
        type: "error",
        msg: "unable to process your request",
        error: null,
        resObj: res,
        data: null,
      });
    }
  };
export const getJob = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Job ID",
        error: null,
        resObj: res,
        data: null,
      });
    const job = await Job.findOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Job",
      error: null,
      resObj: res,
      data: job,
    });
  } catch (error) {
    logging.error("Get Job", "unable to get Job", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};









export const updateJob = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Job ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Job.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated Job",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Update Job", "unaable to update Job", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};
export const deleteJob = async (req: Request, res: Response) => {
try {
  const { id = "" } = req.params;
  if (id == "")
    return responseObj({
      statusCode: HTTP_RESPONSE.BED_REQUEST,
      type: "error",
      msg: "please provide a valid Job ID",
      error: null,
      resObj: res,
      data: null,
    });
  await Job.deleteOne({ _id: id });
  return responseObj({
    statusCode: HTTP_RESPONSE.SUCCESS,
    type: "success",
    msg: "your Job is successfully deleted",
    error: null,
    resObj: res,
    data: null,
  });
} catch (error) {
  logging.error("Delete Job", "unable to delete Job", error);
  return responseObj({
    statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
    type: "error",
    msg: "unable to process your request",
    error: null,
    resObj: res,
    data: null,
  });
}
};
