import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import studentValidationZod from "../student/student.validaton";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, studentData } = req.body;
    const result = await userServices.createStudentDb(password, studentData);
    res.status(200).json({
      success: true,
      message: "Student added Successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
