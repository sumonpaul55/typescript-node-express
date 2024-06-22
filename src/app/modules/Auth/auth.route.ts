import { Router } from "express";
import validateRequest from "../../middleWare/ValidateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", validateRequest(authValidation.loginValidationSchema), authController.loginUser);

export const authRoute = router;
