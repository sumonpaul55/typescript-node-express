import { Router } from "express";
import validateRequest from "../../middleWare/ValidateRequest";
import { semisterRegistrationValidationSchema } from "./semistarRagistration.validation";
import { semisterRagistrationController } from "./semisterRagistration.controller";

const router = Router();
router.post(
  "create-semister-registration",
  validateRequest(semisterRegistrationValidationSchema.createSemisteRegistrationValidationSchema),
  semisterRagistrationController.createSemisterRegistration
);

router.get("/", semisterRagistrationController.getSemisterRagistration);
router.get("/:id", semisterRagistrationController.getSingleSemisterRegistration);
router.patch("/:id", semisterRagistrationController.updateSemisterRagistration);
