import { z } from "zod";

const honeypot = z.string().max(0).optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  phone: z
    .string()
    .min(10, "Enter a valid BD mobile number")
    .max(20)
    .optional()
    .or(z.literal("")),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  subject: z.string().min(2).max(200),
  message: z.string().min(5, "Message is required").max(5000),
  website_url_hp: honeypot,
});

export const verifySchema = z.object({
  chassis: z.string().min(5, "Enter chassis / VIN").max(40),
  name: z.string().min(2).max(120),
  phone: z.string().min(10).max(20),
  notes: z.string().max(2000).optional().or(z.literal("")),
  website_url_hp: honeypot,
});

export const preOrderSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(10).max(20),
  email: z.string().email().optional().or(z.literal("")),
  preferred_make: z.string().max(80).optional().or(z.literal("")),
  preferred_model: z.string().max(80).optional().or(z.literal("")),
  year_min: z.string().optional().or(z.literal("")),
  year_max: z.string().optional().or(z.literal("")),
  budget_bdt: z.string().optional().or(z.literal("")),
  notes: z.string().max(3000).optional().or(z.literal("")),
  website_url_hp: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type VerifyInput = z.infer<typeof verifySchema>;
export type PreOrderInput = z.infer<typeof preOrderSchema>;
