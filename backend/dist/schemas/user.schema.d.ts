import z from "zod";
export declare const createUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        first_name: z.ZodString;
        last_name: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
export declare const findUserByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
