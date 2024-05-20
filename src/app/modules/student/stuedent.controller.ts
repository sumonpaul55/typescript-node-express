import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call service funtion to send this data
    const result = await StudentServices.createStudentDB(studentData);
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: "Students are Retrive successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getSingleStudentFromDb(req.params.id);
    res.status(200).json({
      success: true,
      message: "Students are Retrive successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studenntController = {
  createStudent,
  getAllStudent,
  getOneStudent,
};
