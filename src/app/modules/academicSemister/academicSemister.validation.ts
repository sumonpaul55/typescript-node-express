import { z } from "zod";
import { academicSemisterCode, academicSemisterName, Months } from "./academicSemister.constant";

const createAcademicSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemisterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...academicSemisterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const academicSemisterValidation = {
  createAcademicSemisterValidationSchema,
};
