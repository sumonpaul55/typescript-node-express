import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "academic Faculty must be a string",
      })
      .min(1, "academic faculty name is Required"),
  }),
});

const updateAcademicFacultyValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "academic Faculty must be a string",
      })
      .min(1, "academic faculty name is Required"),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidation,
};
