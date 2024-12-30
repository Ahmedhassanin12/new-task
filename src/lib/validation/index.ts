import * as z from "zod";

// const passwordSchema = z
//   .string()
//   .refine((password) => /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/.test(password), {
//     message:
//       "Password must be at least 8 characters long, contain 1 uppercase letter, and 1 special character (!@#$&*)",
//   });


// ============================================================
// Sign In
// ============================================================

export const SignInValidationSchema = z
  .object({
    email: z.string().min(1, {
      message: "This field is required!",
    }).email("This is not a valid email."),
    // passwordSchema
    password: z.string().min(1, { message: "This field is required!" }),
  })
  .required({ email: true, password: true });


