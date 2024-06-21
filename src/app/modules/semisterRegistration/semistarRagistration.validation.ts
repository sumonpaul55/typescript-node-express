import { z } from "zod";
import { semisterRegistrationStatus } from "./semisterRegistration.constatnt";

const createSemisteRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemister: z.string(),
    status: z.enum([...semisterRegistrationStatus] as [string, ...[]]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCreadit: z.number(),
    maxCreadit: z.number(),
  }),
});

const updateSemisteRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemister: z.string().optional(),
    status: z.enum([...semisterRegistrationStatus] as [string, ...[]]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCreadit: z.number().optional(),
    maxCreadit: z.number().optional(),
  }),
});
export const semisterRegistrationValidationSchema = {
  createSemisteRegistrationValidationSchema,
  updateSemisteRegistrationValidationSchema,
};
