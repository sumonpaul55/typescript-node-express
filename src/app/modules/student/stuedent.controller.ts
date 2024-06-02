import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validaton";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// import studentJoiSchema from "./student.validation";

const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrive successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOneStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getSingleStudentFromDb(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student retrive successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studenntController = {
  getAllStudent,
  getOneStudent,
};
