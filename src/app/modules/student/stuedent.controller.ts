import { NextFunction, request, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validaton";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { Student } from "./student.model";
// import studentJoiSchema from "./student.validation";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrive successfully",
    data: result,
  });
});

const getOneStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getSingleStudentFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrive successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const result = await StudentServices.deleteStudentDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Deleted Successful",
    data: result,
  });
});

export const studenntController = {
  getAllStudent,
  getOneStudent,
  deleteStudent,
};
