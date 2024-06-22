import express from "express";

import { FacultyControllers } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";
import validateRequest from "../../middleWare/ValidateRequest";
import auth from "../../middleWare/auth";

const router = express.Router();

router.get("/", auth(), FacultyControllers.getAllFaculties);

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch("/:id", validateRequest(updateFacultyValidationSchema), FacultyControllers.updateFaculty);

router.delete("/:id", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
