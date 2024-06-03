import express from "express";
import { studenntController } from "./stuedent.controller";

const router = express.Router();
// will call controller func
// router.post("/create-student", studenntController.createStudent);

router.get("/", studenntController.getAllStudent);

router.get("/:id", studenntController.getOneStudent);
router.delete("/:id", studenntController.deleteStudent);

export const StudentRoute = router;
