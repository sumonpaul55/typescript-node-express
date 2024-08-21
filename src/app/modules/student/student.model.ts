import { Schema, model, connect } from "mongoose";
import { TLocalGuardian, TStudent, TUserName, TGuardian, StudentModel } from "./student.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
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
    required: [true, "Father name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "fatherContactNo is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "motherName is required"],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, "motherOccupation is required"],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "motherContactNo is required"],
    trim: true,
  },
  _id: Boolean,
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local name is required"],
  },
  occupation: {
    type: String,
    required: [true, "occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "contact no is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
});

const studenSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, "id is required"], unique: true },
  user: { type: Schema.Types.ObjectId, required: [true, "User id is requred"], unique: true, ref: "User" },
  name: { type: userNameSchema, required: [true, "name is required"] },
  gender: { type: String, enum: ["male", "female"] },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    requerd: true,
    unique: true,
  },
  contactNumber: { type: String, required: [true, "contact number is required"] },
  emergencyContactNo: { type: String, required: [true, "emergency number is required"] },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: 'The blood group failed can only be one of "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"',
    },
  },
  presentAddress: {
    type: String,
    required: [true, "presnet address is required"],
  },
  permenentAdress: {
    type: String,
    required: [true, "permanent address is required"],
  },
  guardian: { type: guardianSchema, required: [true, "guardian is required"] },
  localGuardian: { type: localGuardianSchema, required: [true, "local guardian is required"] },
  profileImage: { type: String, default: "" },
  admissionSemister: { type: Schema.Types.ObjectId, ref: "AcademicSemister" },
  academicDepartment: { type: Schema.Types.ObjectId, ref: "AcademicDepartment" },
  isDeleted: { type: Boolean, default: false },
});
// vertual
studenSchema.virtual("fullName").get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});
// Query middleware
studenSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studenSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studenSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studenSchema.statics.isUserExistByCustomId = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// creating a model

export const Student = model<TStudent>("Student", studenSchema);
