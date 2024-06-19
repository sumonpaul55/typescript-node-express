import { z } from "zod";

const createSemisteRegistrationValidationSchema = z.object({
  body: z.object({}),
});

export const semisterRegistrationValidationSchema = {
  createSemisteRegistrationValidationSchema,
};
