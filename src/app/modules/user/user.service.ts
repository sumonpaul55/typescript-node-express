import { startSession } from "mongoose";
import config from "../../config";
import { AcademicSemister } from "../academicSemister/academicSemisterModel";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentDb = async (password: string, payLoad: TStudent) => {
  // let define a user object
  const userData: Partial<TUser> = {};
  // set password in user object
  userData.password = password || (config.default_password as string);
  // set the role
  userData.role = "student";
  // find academic semister info
  const admissionSemisterData: any = await AcademicSemister.findById(payLoad.admissionSemister);
  // create a isolated environment
  const session = await startSession();
  // applying rollback for transaction consistancy
  try {
    session.startTransaction();
    // set dynamic generated id
    userData.id = await generateStudentId(admissionSemisterData);
    // create a user ----------- (Transaction 1)
    const newUser = await User.create([userData], { session }); //if we use isolated enviroment /// we must provide data as an array and session
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create user");
    }
    // set id, _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; // reference id

    // create 2nd transaction (create student)
    // console.log(payLoad);
    const newStudent = await Student.create([payLoad], { session });

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create Student");
    }
    // commit the sessiont affter successfull all transaction
    await session.commitTransaction();
    // end the session after commit
    await session.endSession();
    return newStudent;
  } catch (err) {
    // if error over session we should abort transaction and end session
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Email should be uniqe");
  }
};

export const userServices = {
  createStudentDb,
};
