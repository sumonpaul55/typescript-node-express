import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await academicDepartmentServices.createAcademicDepartmentDb(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department created successfully",
    data: result,
  });
});
// get all academic department

const getAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAcademicDepartmentDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic Department retrive successfully",
    data: result,
  });
});
// get single academic department
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicDepartmentServices.getSingleAcademicDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic Department retrive successfully",
    data: result,
  });
});
// update academic department
const updateAcademicDepratment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await academicDepartmentServices.updateAcademicDepartmentDb(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic department updated successfully",
    data: result,
  });
});
export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepratment,
};
