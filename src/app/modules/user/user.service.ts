import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";

const createStudentDb = async (userData: TStudent) => {
  //const result = await StudentModel.create(student); //built in static method
  const student = new Student();

  // if (await student.isUserExist()) {
  //   throw new Error("This Student Already Exist");
  // }

  const result = await student.save(); //built in instance method
  return result;
};

export const UserServices = {
  createStudentDb,
};
