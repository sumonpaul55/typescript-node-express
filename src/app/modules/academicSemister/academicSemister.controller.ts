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

const getAcademicSemister = catchAsync(async (req, res) => {
  const result = await AcademicSemisterService.getAcademicSemisterDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic semister retrive succefully",
    data: result,
  });
});
// get one academic semister by id
const getAcademicSemisterOne = catchAsync(async (req, res) => {
  // console.log(req.params.id);
  const result = await AcademicSemisterService.getSemisterById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your Semister retriveed",
    data: result,
  });
});

export const AcademicSemisterController = {
  createAcademicSemister,
  getAcademicSemister,
  getAcademicSemisterOne,
};
