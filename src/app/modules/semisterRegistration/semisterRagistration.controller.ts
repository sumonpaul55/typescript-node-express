import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { semisterRagistrationService } from "./semisterRagistration.service";

const createSemisterRegistration = catchAsync(async (req, res) => {
  const result = await semisterRagistrationService.createSemisterRagisTrationIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Registration created Successfully",
    data: result,
  });
});

const getSemisterRagistration = catchAsync(async (req, res) => {
  const result = await semisterRagistrationService.getAllSemisterRegistrationFromDb(req.params);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Registration Retrived successfully",
    data: result,
  });
});

const getSingleSemisterRegistration = catchAsync(async (req, res) => {
  const result = await semisterRagistrationService.getSingleRegistrationFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semister Retrive Successfully",
    data: result,
  });
});
// update
const updateSemisterRagistration = catchAsync(async (req, res) => {
  const result = await semisterRagistrationService.updateSemisterRegistrationDb(req.params.id, req.body);
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
