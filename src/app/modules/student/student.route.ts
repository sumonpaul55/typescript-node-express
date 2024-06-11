import express from "express";
import { studenntController } from "./stuedent.controller";
import validateRequest from "../../middleWare/ValidateRequest";
import { studentValidations } from "./student.validaton";

const router = express.Router();
// will call controller func
// router.post("/create-student", studenntController.createStudent);

router.get("/", studenntController.getAllStudent);

router.get("/:id", studenntController.getOneStudent);
router.patch("/:studentId", validateRequest(studentValidations.updateStudentValidationSchema), studenntController.updateStudent);
router.delete("/:id", studenntController.deleteStudent);

export const StudentRoute = router;
