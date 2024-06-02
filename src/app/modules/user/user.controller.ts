import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import studentValidationZod from "../student/student.validaton";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
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

export const userControllers = {
  createStudent,
};
