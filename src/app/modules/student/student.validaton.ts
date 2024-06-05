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
    password: z.string(),
    studentData: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"]),
      dateOfBirth: z.date().optional(),
      email: z.string().email("Invalid email format").min(1, "Email is required"),
      contactNumber: z.string().min(1, "Contact number is required"),
      emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
      presentAddress: z.string().min(1, "Present address is required"),
      permenentAdress: z.string().min(1, "Permanent address is required"),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
    }),
  }),
  // isActive: z.enum(["active", "block"]),
});

// Export the schema
export const studentValidations = {
  createStudentValidationSchema,
};
