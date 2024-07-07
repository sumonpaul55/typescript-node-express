import { Router } from "express";
import validateRequest from "../../middleWare/ValidateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import auth from "../../middleWare/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post("/login", validateRequest(authValidation.loginValidationSchema), authController.loginUser);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword
);
router.post("/refresh-token", validateRequest(authValidation.refreshTokenSchema), authController.refreshTokenGenerateAccessToken);

export const authRoute = router;
