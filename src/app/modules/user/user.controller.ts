import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;
    const result = await UserServices.createStudentDb(studentData);
    res.status(200).json({
      success: false,
      message: "Student added Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went worng",
      data: null,
    });
  }
};

export const userController = {
  createStudent,
};
