import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseDb = async (payLoad: TCourse) => {
  const result = await Course.create();
  return result;
};
// get courses
const getAllCourseFromDb = async () => {
  const result = await Course.find();
  return result;
};
// get single course
const getSingleCourseFromDb = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};
// update course
const deleteCourseIntoDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true, new: true });
  return result;
};

export const courseServices = {
  createCourseDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  deleteCourseIntoDb,
};
