import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUserDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully",
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  console.log(req.body, req.user);
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await authService.changePasswordDb(user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully",
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
};
