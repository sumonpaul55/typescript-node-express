import { Router } from "express";
import validateRequest from "../../middleWare/ValidateRequest";
import { courseValidations } from "./course.validation";
import { coruseController } from "./course.controller";

const router = Router();

router.post("/create-course", validateRequest(courseValidations.createCourseValidationSchema), coruseController.createCourse);
router.get("/", coruseController.getAllcourese);
router.get("/:id", coruseController.getSingleCourse);
router.patch("/:id", validateRequest(courseValidations.updateCourseValidationSchema), coruseController.updateCourse);
router.delete("/:id", coruseController.deleteCourse);

export const courseRoute = router;
