import { Schema, model, connect } from "mongoose";
import { TLocalGuardian, TStudent, TUserName, TGuardian, StudentModel } from "./student.interface";
// import bcrypt from "bcrypt";
// const bcrypt = require('bcrypt');

// import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "first name is required"],
    maxlength: [20, "first name can not be more than 20 character"],
    trim: true,
    validate: {
      validator: function (firstName: string) {
        const firstNamevalue = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        return firstName === firstNamevalue;
      },
      message: `{VALUE} should be capitalize`,
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  _id: Boolean,
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
    trim: true,
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: true,
    trim: true,
  },
  _id: Boolean,
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studenSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: [true, "User id is requred"], unique: true, ref: "User" },
  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ["male", "female"] },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    requerd: true,
  },
  contactNumber: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: 'The blood group failed can only be one of "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"',
    },
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permenentAdress: {
    type: String,
    required: true,
  },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImage: { type: String },
});

// studenSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// creating a model
export const Student = model<TStudent>("Student", studenSchema);
