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
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
  );
