import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseDb = async (payLoad: TCourse) => {
  const result = await Course.create(payLoad);

  return result;
};
// get courses
const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find().populate("preRequisitsCourses.course"), query)
    .search(courseSearchableFields)
    .filter()
    .sort()
    .fields();
  const result = await courseQuery.modelQuery;
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
