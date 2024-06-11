import { NextFunction, request, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
// import { Student } from "./student.model";
import catchAsync from "../../utils/catchAsync";
// import studentJoiSchema from "./student.validation";

const getAllStudent = catchAsync(async (req, res) => {
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
// update student
const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const { studentData } = req.body;
  const result = await StudentServices.updateStudentIntoDb(id, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student udpated Successfully",
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.deleteStudentDb(req.params.id);
  // console.log(result);
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
  updateStudent,
};
