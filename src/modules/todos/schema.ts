import z from "zod"

export const createTodoSchema = z.object ({
    task: z.string().min(4),
    desc: z.string().min(10)
})