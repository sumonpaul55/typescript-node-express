import express from "express";
import { userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validaton";
import validateRequest from "../../middleWare/ValidateRequest";

const router = express.Router();

router.post("/create-student", validateRequest(studentValidations.createStudentValidationSchema), userControllers.createStudent);

export const UserRoute = router;
