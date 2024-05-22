import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentDB = async (studentData: TStudent) => {
  //const result = await StudentModel.create(student); //built in static method
  const student = new Student(studentData);

  if (await student.isUserExist(studentData.id)) {
    throw new Error("This Student Already Exist");
  }

  const result = await student.save(); //built in instance method
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
export const StudentServices = {
  createStudentDB,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
};
