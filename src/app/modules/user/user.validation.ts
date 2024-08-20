import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "",
    })
    .max(20, { message: "Password cannot be more than 20 character" }),
});

export default userValidationSchema;
