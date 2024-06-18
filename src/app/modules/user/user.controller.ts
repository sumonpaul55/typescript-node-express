import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, studentData } = req.body;
    const result = await userServices.createStudentDb(password, studentData);
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
  } catch (error) {
    next(error);
  }
};

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

export const userControllers = {
  createStudent,
  createFaculty,
};
