import { Router } from "express";
import { academicDepartmentControllers } from "./academicDepartment.controller";
import validateRequest from "../../middleWare/ValidateRequest";
import { academicDepartmentValidations } from "./academicDepartment.validation";

const router = Router();

router.post(
  "/create-department",
  validateRequest(academicDepartmentValidations.createAcademicDepartmentValidationSchema),
  academicDepartmentControllers.createAcademicDepartment
);
router.get("/", academicDepartmentControllers.getAcademicDepartment);

router.get("/:id", academicDepartmentControllers.getSingleAcademicDepartment);
router.patch(
  "/:id",
  validateRequest(academicDepartmentValidations.updateAcademicDepartmentValidationSchema),
  academicDepartmentControllers.updateAcademicDepratment
);

export const academicDepartmentRoutes = router;
