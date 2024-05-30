import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentDb = async (password: string, studentData: TStudent) => {
  // let define a user object
  const userData: Partial<TUser> = {};
  // set password in user object
  userData.password = password || (config.default_password as string);
  // set the role
  userData.role = "student";
  // set mannually generated id
  userData.id = "20300001";

  // create a user
  const result = await User.create(userData);
  // create a student
  if (Object.keys(result).length) {
    // set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }
};

export const UserServices = {
  createStudentDb,
};
