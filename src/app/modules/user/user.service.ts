import { startSession } from "mongoose";
import config from "../../config";
import { AcademicSemister } from "../academicSemister/academicSemisterModel";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { Admin } from "../Admin/admin.model";
import { TFaculty } from "../Faculty/faculty.interface";
import { TAdmin } from "../Admin/admin.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Faculty } from "../Faculty/faculty.model";
import { sendImageToCloudinary } from "../../utils/sendImagetoCloudinary";

const createStudentDb = async (file: any, password: string, payLoad: TStudent) => {
  // let define a user object
  const userData: Partial<TUser> = {};
  // set password in user object
  userData.password = password || (config.default_password as string);
  // set the role
  userData.role = "student";
  // set student email
  userData.email = payLoad.email;
  // find academic semister info

  const admissionSemisterData = await AcademicSemister.findById(payLoad.admissionSemister);

  if (!admissionSemisterData) {
    throw new AppError(400, "Admission semister not found");
  }
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

    // set id, _id as user ,profile image
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; // reference id

    if (file) {
      const imageName = `${userData.id}${payLoad?.name?.firstName}`;
      const path = String(file?.path);
      // send image to cloudinary
      const { secure_url }: any = await sendImageToCloudinary(imageName, path);
      payLoad.profileImage = secure_url;
    }

    // create 2nd transaction (create student)
    const newStudent = await Student.create([payLoad], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Faild to create Student");
    }
    // commit the sessiont affter successfull all transaction
    await session.commitTransaction();
    // end the session after commit
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    // if error over session we should abort transaction and end session

    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = "faculty";

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);

  if (!academicDepartment) {
    throw new AppError(400, "Academic department not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create faculty");
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = "admin";

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set email
    userData.email = payload.email;
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    // create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
// get all users
// const getAlluserFromDb = async () => {
//   const result = await User.find({});
//   return result;
// };
export const userServices = {
  createStudentDb,
  createAdminIntoDB,
  createFacultyIntoDB,
};
