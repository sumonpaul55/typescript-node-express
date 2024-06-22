import express from "express";
import { userControllers } from "./user.controller";
import { studentValidations } from "../student/student.validaton";
import validateRequest from "../../middleWare/ValidateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { AdminValidations } from "../Admin/admin.validation";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent
);
router.post("/create-faculty", validateRequest(createFacultyValidationSchema), userControllers.createFaculty);
router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  userControllers.createAdmin
);
export const UserRoute = router;
