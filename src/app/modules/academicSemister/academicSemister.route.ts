import { Router } from "express";
import { AcademicSemisterController } from "./academicSemister.controller";
import validateRequest from "../../middleWare/ValidateRequest";
import { academicSemisterValidation } from "./academicSemister.validation";

const router = Router();

router.post(
  "/create-academic-semister",
  validateRequest(academicSemisterValidation.createAcademicSemisterValidationSchema),
  AcademicSemisterController.createAcademicSemister
);
router.get("/", AcademicSemisterController.getAcademicSemister);
router.get("/:id", AcademicSemisterController.getAcademicSemisterOne);
router.patch("/:id", validateRequest(academicSemisterValidation.updateAcademicSemisterValidationSchema), AcademicSemisterController.updateSemister);

export const AcademicSemisterRoutes = router;
