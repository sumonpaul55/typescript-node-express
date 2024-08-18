import { Router } from "express";
import { AcademicSemisterController } from "./academicSemister.controller";
import validateRequest from "../../middleWare/ValidateRequest";
import { academicSemisterValidation } from "./academicSemister.validation";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/create-academic-semister",
  validateRequest(academicSemisterValidation.createAcademicSemisterValidationSchema),
  AcademicSemisterController.createAcademicSemister
);
router.get("/", auth(USER_ROLE.admin), AcademicSemisterController.getAcademicSemister);
router.get("/:id", AcademicSemisterController.getAcademicSemisterOne);
router.patch("/:id", validateRequest(academicSemisterValidation.updateAcademicSemisterValidationSchema), AcademicSemisterController.updateSemister);

export const AcademicSemisterRoutes = router;
