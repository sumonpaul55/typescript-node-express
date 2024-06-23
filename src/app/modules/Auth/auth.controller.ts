import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUserDb(req.body);
  const { accessToken, refreshToken, needsPasswordChange } = result;
  // set the refresh token in cookies
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully",
    data: { accessToken, needsPasswordChange },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await authService.changePasswordDb(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password has been changed successfully",
    data: result,
  });
});
const refreshTokenGenerateAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "access Token is retrived successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshTokenGenerateAccessToken,
};
