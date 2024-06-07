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

export const AcademicSemisterRoutes = router;
