import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course created Successfully",
    data: result,
  });
});
const getAllcourese = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses are retrive successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = courseServices.getSingleCourseFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course Retrive succefull",
    data: result,
  });
});
//delete course
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = courseServices.deleteCourseIntoDb(id);
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
  deleteCourse,
};
