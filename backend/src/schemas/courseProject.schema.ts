import z from "zod";

export const addCourseProjectSchema = z.object({
    body: z.object({
        title: z.string(),
        user: z.string().min(1).regex(/^[0-9]$/)
    })
})

export const getCourseProjectByUserIdSchema = z.object({
    params: z.object({
        id: z.string().min(1)
    })
})