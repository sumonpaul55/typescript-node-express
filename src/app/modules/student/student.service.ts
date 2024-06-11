import { startSession } from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentsFromDb = async () => {
  const result = await Student.find()
    .populate("admissionSemister")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
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
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, { new: true });
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
