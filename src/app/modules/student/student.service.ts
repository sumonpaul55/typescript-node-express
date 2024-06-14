import { startSession } from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; //copy of main query objecct
  // {email: {$regex: query.searchTerm, $option: i }} method of search
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const excludeFields = ["searchTerm", "sort", "limit"];
  excludeFields.forEach((el) => delete queryObj[el]);
  const searchQuery = Student.find({
    $or: ["name.firstName", "email", "presentAddress"].map((fields) => ({ [fields]: { $regex: searchTerm, $options: "i" } })),
  });
  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemister")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort();

  let limit = 1;
  if (query.limit) {
    limit = query.limit as number;
  }
  const limitQuery = await sortQuery.limit(limit);
  return limitQuery;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate("admissionSemister")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
// update student
const updateStudentIntoDb = async (id: string, payLoad: Partial<TStudent>) => {
  // return error if data isn't exist
  const isExistUpdatedId = await Student.findOne({ id });
  if (!isExistUpdatedId) {
    throw new AppError(httpStatus.NOT_FOUND, "This Student not found");
  }
  //
  const { name, guardian, localGuardian, ...remaingStudent } = payLoad;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remaingStudent,
    // non primitive
  };
  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${keys}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [keys, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${keys}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [keys, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${keys}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, { runValidators: true, new: true });
  return result;
};

const deleteStudentDb = async (id: string) => {
  // transaction rollback for delete true from user and student collections

  const isExistStudnet = await Student.findOne({ id });
  if (!isExistStudnet) {
    throw new AppError(httpStatus.NOT_FOUND, "Student Not found");
  }

  const session = await startSession();
  try {
    session.startTransaction();
    const delededStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    if (!delededStudent) {
      throw new AppError(httpStatus.EXPECTATION_FAILED, "Falied to delete student");
    }
    const deleteUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    if (!deleteUser) {
      throw new AppError(httpStatus.EXPECTATION_FAILED, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return delededStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to delete Student");
  }
};

export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  updateStudentIntoDb,
  deleteStudentDb,
};
