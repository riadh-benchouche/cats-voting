import {z} from "zod";

export const createCatSchema = z.object({
    image: z.string().url(),
});

export const updateCatSchema = z.object({
    image: z.string().url().optional(),
});

export type createCatDto = z.infer<typeof createCatSchema>;
export type updateCatDto = z.infer<typeof updateCatSchema>;