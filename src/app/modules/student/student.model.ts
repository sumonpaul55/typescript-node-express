import { Schema, model, connect } from "mongoose";
import { Guardian, LocalGuardian, Student, UserName } from "./student.interface";

const userNameSchema = new Schema<UserName>({
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
});

const guardianSchema = new Schema<Guardian>({
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
});

const localGuardianSchema = new Schema<LocalGuardian>({
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

const studenSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  name: { type: userNameSchema, required: true },
  gender: { type: String, enum: ["male", "female"] },
  dateOfBirth: String,
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
  isActive: {
    type: String,
    enum: {
      values: ["active", "block"],
      message: "{VALUES} is not supported",
    },
  },
});

// creating a model
export const StudentModel = model<Student>("Student", studenSchema);
