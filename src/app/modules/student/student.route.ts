import express from "express";
import { studenntController } from "./stuedent.controller";
import validateRequest from "../../middleWare/ValidateRequest";
import { studentValidations } from "./student.validaton";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();
// will call controller func
// router.post("/create-student", studenntController.createStudent);

router.get("/", auth(USER_ROLE.admin), studenntController.getAllStudent);

router.get("/:id", studenntController.getOneStudent);
router.patch("/:id", validateRequest(studentValidations.updateStudentValidationSchema), studenntController.updateStudent);
router.delete("/:id", studenntController.deleteStudent);

export const StudentRoute = router;
