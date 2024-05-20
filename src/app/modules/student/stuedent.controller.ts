import { Request, Response } from "express";
import { StrdentServices } from "./student.service";

const createStudent = async(req: Request, res: Response)=>{
try {
    const student  = req.body;
    // will call service funtion to send this data
const result = await StrdentServices.createStudentDB(student)
res.status(200).json({
    success: true,
    message:"Student is created successfully",
    data: result
})
} catch (error) {
    console.log(error)
}
}

export const studenntController = {
    createStudent,
}