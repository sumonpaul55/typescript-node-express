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
  const result = await Course.findById(id).populate("preRequisitsCourses.course");
  return result;
};
// update course
const updateCourseIntoDb = async (id: string, payLoad: Partial<TCourse>) => {
  const { preRequisitsCourses, ...courseRemaingDat } = payLoad;

  // step:1 basic course update info
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemaingDat, { new: true, runValidators: true });
  // check if there is any preRequisit course to update
  if (preRequisitsCourses && preRequisitsCourses.length > 0) {
    // filter out the deleted fields
    const deletedPreRequisite = preRequisitsCourses.filter((el) => el.course && el.isDeleted).map((el) => el.course);
    const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisitsCourses: { course: { $in: deletedPreRequisite } } },
    });
  }
  // remove delete courses

  return updateBasicCourseInfo;
};
// delete course
const deleteCourseIntoDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true, new: true });
  return result;
};

export const courseServices = {
  createCourseDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  deleteCourseIntoDb,
  updateCourseIntoDb,
};
