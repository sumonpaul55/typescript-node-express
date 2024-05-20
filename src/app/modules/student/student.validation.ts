import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string().required().max(20).trim(),
  middleName: Joi.string().allow(null, ""),
  lastName: Joi.string().required(),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required().trim(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required().trim(),
  motherContactNo: Joi.string().required().trim(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentJoiSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid("male", "female"),
  dateOfBirth: Joi.string(), // You may want to add additional validation for date format
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  emergancyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
  presentAddress: Joi.string().required(),
  permenentAdress: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImage: Joi.string().allow(null, ""),
  isActive: Joi.string().valid("active", "block"),
});

export default studentJoiSchema;
