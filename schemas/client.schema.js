import z from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().max(10, "Name must be at least 10 characters long"),
    email: z.email("Invalid email format"),
    phone: z.string().max(10, "Phone number must contain a maximum of 10 characters."),
    // role: z.enum(['admin', 'user']).default('user')
  }).strict(),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().max(10, "Name must be at most 10 characters long").optional(),
    email: z.email("Invalid email format").optional(),
    phone: z.string().max(10, "Phone number must contain a maximum of 10 characters.").optional(),
  }).strict()
});