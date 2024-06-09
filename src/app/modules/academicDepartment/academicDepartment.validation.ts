import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "academic department name must be string",
        required_error: "academic department name is required",
      })
      .min(1, "academic department name is required"),
    academicFaculty: z.string({
      invalid_type_error: "academic department must be string",
      required_error: "academic faculty is required",
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "academic department name must be string",
        required_error: "academic department name is required",
      })
      .min(1, "academic department name is required")
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "academic department must be string",
        required_error: "academic faculty is required",
      })
      .optional(),
  }),
});

export const academicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
