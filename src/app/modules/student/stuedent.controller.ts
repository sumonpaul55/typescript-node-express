import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validaton";

// import studentJoiSchema from "./student.validation";

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
  getAllStudent,
  getOneStudent,
};
