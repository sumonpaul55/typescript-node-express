import { Router } from "express";
import validateRequest from "../../middleWare/ValidateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFacultyControllers } from "./academicFaculty.controller";

const router = Router();

router.post(
  "/create-faculty",
  validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty
);
router.get("/", academicFacultyControllers.getAcademicFaculty);

router.get("/:facultyId", academicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  "/:facultyId",
  validateRequest(academicFacultyValidation.updateAcademicFacultyValidation),
  academicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
