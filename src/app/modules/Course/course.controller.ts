import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course created Successfully",
    data: result,
  });
});
const getAllcourese = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses are retrive successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Retrive succefull",
    data: result,
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServices.updateCourseIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Update Successfully",
    data: result,
  });
});
//delete course
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseIntoDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Deleted successfully",
    data: result,
  });
});

export const coruseController = {
  createCourse,
  getAllcourese,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
