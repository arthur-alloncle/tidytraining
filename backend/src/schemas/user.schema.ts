import z from "zod";

export const findUserByIdSchema = z.object({
    params: z.object({
        id: z.string().min(1).regex(/^[0-9]$/)
    })
})
