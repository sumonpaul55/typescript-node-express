import config from "../../config";
import { TAcademicSemister } from "../academicSemister/academicSemisterInterFace";
import { AcademicSemister } from "../academicSemister/academicSemisterModel";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentDb = async (password: string, payLoad: TStudent) => {
  // let define a user object
  const userData: Partial<TUser> = {};
  // set password in user object
  userData.password = password || (config.default_password as string);
  // set the role
  userData.role = "student";
  // find academic semister info
  const admissionSemisterData: any = await AcademicSemister.findById(payLoad.admissionSemister);
  // set dynamic generated id
  if (admissionSemisterData) {
    userData.id = await generateStudentId(admissionSemisterData);
    // create a user
    const newUser = await User.create(userData);
    // create a student
    if (Object.keys(newUser).length) {
      // set id, _id as user
      payLoad.id = newUser.id;
      payLoad.user = newUser._id; // reference id

      const newStudent = await Student.create(payLoad);
      return newStudent;
    }
  }
  throw new Error(`there is no academic Semister`);
};

export const userServices = {
  createStudentDb,
};
