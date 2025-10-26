import z from "zod";

export const createUserSchema = z.object({
    body: z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.email(),
      password: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    }),
  });