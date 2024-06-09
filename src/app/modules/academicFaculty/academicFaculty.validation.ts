import { z } from "zod";

const academicFacultyValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: "academic Faculty must be a string",
    })
    .min(1, "academic faculty name is Required"),
});

export const academicFacultyValidation = {
  academicFacultyValidationSchema,
};
