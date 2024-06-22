import express from "express";
import { studenntController } from "./stuedent.controller";
import validateRequest from "../../middleWare/ValidateRequest";
import { studentValidations } from "./student.validaton";
import auth from "../../middleWare/auth";

const router = express.Router();
// will call controller func
// router.post("/create-student", studenntController.createStudent);

router.get("/", auth(), studenntController.getAllStudent);

router.get("/:id", studenntController.getOneStudent);
router.patch("/:id", validateRequest(studentValidations.updateStudentValidationSchema), studenntController.updateStudent);
router.delete("/:id", studenntController.deleteStudent);

export const StudentRoute = router;
