import express from "express";
// import {
//   addUser,
//   getUser,
//   getUsers,
// } from "../../controllers/authController/auth";
import { auth } from "../../middelware/firebaseAuth";

import { upload } from "../../middelware/uploder";
import { addJob, getAllJobs, getJob, getJobs } from "../../controllers/jobController/job";
import { addEmployee, approveEmployee, getAllEmployees, getEmployee, updateEmployee } from "../../controllers/employeeController/employee";
const router = express.Router();

//user
// router.post("/user", auth, addUser);
// router.get("/user", auth, getUsers);
// router.get("/user/current", auth, getUser);

router.post("/employer/job",auth, addJob);
router.get("/employer/job",auth, getJobs);
router.get("/employer/job/all",auth, getAllJobs);
router.get("/employer/job/:id",auth, getJob);

router.post("/employee/job",auth, addEmployee);
router.put("/employee/job",auth, updateEmployee);

router.get("/employee/job/all",auth, getAllEmployees);
router.get("/employee/job/:id",auth, getEmployee);
router.post("/employee/job/approve/:id",auth, approveEmployee)





export default router;