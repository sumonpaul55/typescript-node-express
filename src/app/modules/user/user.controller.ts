import { NextFunction, Request, RequestHandler, response, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, studentData } = req.body;

  const result = await userServices.createStudentDb(req.file, password, studentData);
  // res.status(200).json({
  //   success: true,
  //   message: "Student added Successfully",
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});
// get all users
// const getAllUsers = catchAsync(async (req, res) => {
//   const result = await userServices.getAlluserFromDb;
//   console.log(result);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "All Users retrive successfull",
//     data: result,
//   });
// });
export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
