import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { IEmployee } from "../../interfaces/IEmployee";
import Employee from "../../models/Employee";
import Job from "../../models/Job";

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const {
    jobId
    }: IEmployee = req.body;
    const { uid } = req.body.user;
    delete req.body._id
    if (
       jobId == ""
    ) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid job id",
        error: null,
        resObj: res,
        data: null,
      });
    }
    console.log("req.body",{ uid, ...req.body })
    const newEmployee: IEmployee = new Employee({ uid, ...req.body });
    await newEmployee.save();

    await Job.updateOne({_id:jobId},{$set:{isPanding:false}})

    // add push notification to notify user
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully posted new Employee",
      error: null,
      resObj: res,
      data: newEmployee,
    });
  } catch (error) {
    logging.error("Add Employee", "unable to add Employee", error);
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



export const approveEmployee = async (req: Request, res: Response) => {
    try {
      const { id = "" } = req.params;
      if (id == "")
        return responseObj({
          statusCode: HTTP_RESPONSE.BED_REQUEST,
          type: "error",
          msg: "please provide a valid Employee ID",
          error: null,
          resObj: res,
          data: null,
        });
  
      await Employee.updateOne(
        { _id:id },
        {
          $set:{isApproved:true},
        }
      );
      return responseObj({
        statusCode: HTTP_RESPONSE.SUCCESS,
        type: "success",
        msg: "hey, you are successfully approved Employee",
        error: null,
        resObj: res,
        data: null,
      });
    } catch (error) {
      logging.error("Update Employee", "unaable to update Employee", error);
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



export const getAllEmployees = async (req: Request, res: Response) => {
    try {
      
      const employees = await Employee.find();
      return responseObj({
        statusCode: HTTP_RESPONSE.SUCCESS,
        type: "success",
        msg: "your Employees",
        error: null,
        resObj: res,
        data: employees,
      });
    } catch (error) {
      logging.error("Get Employees", "unaable to get Employees", error);
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




export const getEmployee = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Employee ID",
        error: null,
        resObj: res,
        data: null,
      });
    const employee = await Employee.findOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Employee",
      error: null,
      resObj: res,
      data: employee,
    });
  } catch (error) {
    logging.error("Get Employee", "unable to get Employee", error);
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

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Employee ID",
        error: null,
        resObj: res,
        data: null,
      });
    await Employee.deleteOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Employee is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Delete Employee", "unable to delete Employee", error);
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

export const updateEmployee = async (req: Request, res: Response) => {
    try {
      const { _id = "" } = req.body;
      if (_id == "")
        return responseObj({
          statusCode: HTTP_RESPONSE.BED_REQUEST,
          type: "error",
          msg: "please provide a valid Employee ID",
          error: null,
          resObj: res,
          data: null,
        });
  
      await Employee.updateOne(
        { _id },
        {
          ...req.body,
        }
      );
      return responseObj({
        statusCode: HTTP_RESPONSE.SUCCESS,
        type: "success",
        msg: "hey, you are successfully updated Employee",
        error: null,
        resObj: res,
        data: null,
      });
    } catch (error) {
      logging.error("Update Employee", "unaable to update Employee", error);
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

  export const getEmployees = async (req: Request, res: Response) => {
    try {
      const { uid } = req.body.user;
      const employees = await Employee.find({ uid });
      return responseObj({
        statusCode: HTTP_RESPONSE.SUCCESS,
        type: "success",
        msg: "your Employees",
        error: null,
        resObj: res,
        data: employees,
      });
    } catch (error) {
      logging.error("Get Employees", "unaable to get Employees", error);
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