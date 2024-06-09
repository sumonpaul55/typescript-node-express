import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicFacultyServices.createAcademicFacultyDb(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty has been created successfully",
    data: result,
  });
});

const getAcademicFaculty = catchAsync(async (req, res) => {
  const result = academicFacultyServices.getAcademicFacultiesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic Faculty retrive successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = academicFacultyServices.getSingleAcademicFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty retrived",
    data: result,
  });
});
// update academic faculty
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.facultyId;
  const data = req.body;
  const result = await academicFacultyServices.updateAcademicFaculty(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty updated successfully",
    data: result,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
