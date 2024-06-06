import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemisterService } from "./academicSemister.service";

const createAcademicSemister = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AcademicSemisterService.createAcademicSemisterDb(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semister Created successfully",
    data: result,
  });
});

export const AcademicSemisterController = {
  createAcademicSemister,
};
