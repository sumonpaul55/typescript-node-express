import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { courseSearchableFields } from "./constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import mongoose from "mongoose";

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

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // step:1 basic course update info
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(id, courseRemaingDat, { new: true, runValidators: true, session });
    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }
    // check if there is any preRequisit course to update
    if (preRequisitsCourses && preRequisitsCourses.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisite = preRequisitsCourses.filter((el) => el.course && el.isDeleted).map((el) => el.course);
      await Course.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisitsCourses: { course: { $in: deletedPreRequisite } } },
        },
        {
          new: true,
          session,
          runValidators: true,
        }
      );
      if (!deletedPreRequisite) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
      const newPreRequisiteCourses = preRequisitsCourses?.filter((el) => el.course && !el.isDeleted);
      await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisitsCourses: { $each: newPreRequisiteCourses } },
        },
        {
          session,
          runValidators: true,
          new: true,
        }
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
    }
    const result = await Course.findById(id).populate("preRequisitsCourses.course");
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
  }
};

// delete course
const deleteCourseIntoDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true, new: true });
  return result;
};

// assign cours faculty
const assignFacultiesWithCourseIntoDb = async (id: string, payLoad: Partial<TCourseFaculty>) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $addToSet: { faculties: { $each: payLoad } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

export const courseServices = {
  createCourseDb,
  getAllCourseFromDb,
  getSingleCourseFromDb,
  deleteCourseIntoDb,
  updateCourseIntoDb,
};
