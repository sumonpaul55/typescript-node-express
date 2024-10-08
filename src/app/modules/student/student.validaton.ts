import { Types } from "mongoose";
import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z.string().max(20, "First name cannot be more than 20 characters").trim().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father name is required"),
  fatherOccupation: z.string().trim().min(1, "Father occupation is required"),
  fatherContactNo: z.string().trim().min(1, "Father contact number is required"),
  motherName: z.string().trim().min(1, "Mother name is required"),
  motherOccupation: z.string().trim().min(1, "Mother occupation is required"),
  motherContactNo: z.string().trim().min(1, "Mother contact number is required"),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  contactNo: z.string().min(1, "Contact number is required"),
  address: z.string().min(1, "Address is required"),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    studentData: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"], { required_error: "gender required" }),
      dateOfBirth: z.string({ required_error: "DOB required" }).optional(),
      email: z.string().email("Invalid email format").min(1, "Email is required"),
      contactNumber: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permenentAdress: z.string().min(1, "Permanent address is required"),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemister: z.string(),
    }),
  }),
});
// ----------------------------------- all update validation schema ----------------------------------------------------

const updatelocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  occupation: z.string().min(1, "Occupation is required").optional(),
  contactNo: z.string().min(1, "Contact number is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
});
const updateguardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father name is required").optional(),
  fatherOccupation: z.string().trim().min(1, "Father occupation is required").optional(),
  fatherContactNo: z.string().trim().min(1, "Father contact number is required").optional(),
  motherName: z.string().trim().min(1, "Mother name is required").optional(),
  motherOccupation: z.string().trim().min(1, "Mother occupation is required").optional(),
  motherContactNo: z.string().trim().min(1, "Mother contact number is required").optional(),
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().max(20, "First name cannot be more than 20 characters").trim().min(1, "First name is required").optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    studentData: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(["male", "female"]).optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z.string().email("Invalid email format").min(1, "Email is required").optional(),
      contactNumber: z.string().min(1, "Contact number is required").optional(),
      emergencyContactNo: z.string().min(1, "Emergency contact number is required").optional(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      presentAddress: z.string().min(1, "Present address is required").optional(),
      permenentAdress: z.string().min(1, "Permanent address is required").optional(),
      guardian: updateguardianValidationSchema.optional(),
      localGuardian: updatelocalGuardianValidationSchema.optional(),
      profileImage: z.string().optional(),
      admissionSemister: z.string().optional(),
    }),
  }),
});

// Export the schema
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
