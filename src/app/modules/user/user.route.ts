import express from "express";
import { userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validaton";
import validateRequest from "../../middleWare/ValidateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";

const router = express.Router();

router.post("/create-student", validateRequest(studentValidations.createStudentValidationSchema), userControllers.createStudent);
router.post("create-faculty", validateRequest(createFacultyValidationSchema), userControllers.createFaculty);

export const UserRoute = router;
