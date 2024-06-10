import { z } from "zod";
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")
  .optional();

export const emailValidation = z
  .string()
  .regex(emailRegex, { message: "Invalid email address" })
  .transform((val, ctx) => {
    const email = val.trim();
    if (email !== val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email must be lowercase",
      });
    }
    return email;
  })
  .transform((val, ctx) => {
    const email = val.toLowerCase();
    if (email !== val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email must not contain leading or trailing whitespace",
      });
    }
    return email;
  })
  .optional();

export const passwordValidation = z
  .string()
  .min(6, { message: "Password must be at aleast 6 characters" })
  .max(20, { message: "Password must be no more than 20 characters" })
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one digit")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

export const phoneNumberValidation = z
  .number()
  .min(10, { message: "Phone number must be atleast 10 number" })
  .max(10, { message: "Phone number must be atleast 12 number" });
