import z from "zod";
export declare const addCourseProjectSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        user: z.ZodNumber;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
export declare const getCourseProjectByUserIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.z.core.$strip>;
}, z.z.core.$strip>;
