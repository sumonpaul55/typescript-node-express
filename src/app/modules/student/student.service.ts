import { Student } from "./student.model";

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ _id: id });
  return result;
};

const deleteStudentDb = async (id: string) => {
  return await Student.deleteOne({ _id: id });
};

export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentDb,
};
