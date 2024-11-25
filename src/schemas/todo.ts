import { z } from "zod";

export const todoSchema = z.object({
	id: z.optional(z.string().uuid()),
	title: z.string().min(1, "Title can't be empty"),
});

export type Todo = z.infer<typeof todoSchema>;
