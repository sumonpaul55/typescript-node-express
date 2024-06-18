import { z } from "zod";

const preRequisitCouresesvalidtion = z.object({
  coures: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(preRequisitCouresesvalidtion).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateRequisitCouresesvalidtion = z.object({
  coures: z.string().optional(),
  isDeleted: z.boolean().optional(),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(updateRequisitCouresesvalidtion).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

// faculties validation
const assingFacultiesWithCourseValidationSchema = z.object({
  boyd: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assingFacultiesWithCourseValidationSchema,
};
