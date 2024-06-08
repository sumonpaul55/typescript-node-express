import config from "../../config";
import { TAcademicSemister } from "../academicSemister/academicSemisterInterFace";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentDb = async (password: string, studentData: TStudent) => {
  // let define a user object
  const userData: Partial<TUser> = {};
  // set password in user object
  userData.password = password || (config.default_password as string);
  // set the role
  userData.role = "student";

  //  generate studennt id //year, semister code
  const generateStudentId = (payLoad: TAcademicSemister) => {};

  // set mannually generated id
  userData.id = "";
  // create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id, _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentDb,
};
