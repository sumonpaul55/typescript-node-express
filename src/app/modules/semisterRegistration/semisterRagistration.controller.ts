import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semisterRagistrationService } from "./semisterRagistration.service";

const createSemisterRegistration = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await semisterRagistrationService.createSemisterRagisTrationIntoDb(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Registration created Successfully",
    data: result,
  });
});

const getSemisterRagistration = catchAsync(async (req, res) => {
  const result = "";
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Registration Retrived successfully",
    data: result,
  });
});

const getSingleSemisterRegistration = catchAsync(async (req, res) => {
  const result = "";
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Retrive Successfully",
    data: result,
  });
});
// update
const updateSemisterRagistration = catchAsync(async (req, res) => {
  const result = "";
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Updated Successfully",
    data: result,
  });
});
export const semisterRagistrationController = {
  createSemisterRegistration,
  getSemisterRagistration,
  getSingleSemisterRegistration,
  updateSemisterRagistration,
};
