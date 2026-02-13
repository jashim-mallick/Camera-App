import z from "zod";

export const LogInFormSchema = z.object({
    name:z.string().min(1 ,{error:"min 1"}).max(8, {error:"max 8"}),
    password:z.string().min(3,{error:"min 3"}).max(8, {error:"max 8"})
})

export type LoginType = z.infer<typeof LogInFormSchema>