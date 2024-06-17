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
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
};
