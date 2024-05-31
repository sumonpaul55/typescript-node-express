import { Request, Response } from "express";
import { userServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, studentData } = req.body;
    const result = await userServices.createStudentDb(password, studentData);
    res.status(200).json({
      success: true,
      message: "Student added Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went worng",
    });
  }
};

export const userControllers = {
  createStudent,
};
