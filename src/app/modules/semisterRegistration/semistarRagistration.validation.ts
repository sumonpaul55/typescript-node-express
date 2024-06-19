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

export const semisterRegistrationValidationSchema = {
  createSemisteRegistrationValidationSchema,
};
