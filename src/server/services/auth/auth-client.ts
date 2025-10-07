"use client";

import { createAuthClient } from "better-auth/react";

import { useRouter } from "next/navigation";

/*
 * polar
 */
// import { polarClient } from "@polar-sh/better-auth";

/*
 * auth client
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string,
  trustedOrigins: [process.env.NEXT_PUBLIC_BETTER_AUTH_URL as string],
  // plugins: [polarClient()],
});

// start ------------------------------ google signin ------------------------------
export const betterAuthGoogle = async () => {
  const response = await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "google",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    // errorCallbackURL: "/auth/signin",
    /**
     * A URL to redirect if the user is newly registered
     */
    // newUserCallbackURL: "/feature/dashboard",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    disableRedirect: false,
    /**
     * The scopes to request from the provider
     * @default []
     */
    // scopes: ["https://www.googleapis.com/auth/user.phonenumbers.read"],
    scopes: [],
  });
  console.log("response from google signin", response);
};
// end ------------------------------ google signin ------------------------------

// start ------------------------------ email signin ------------------------------
export const betterAuthSignIn = async (email: string, password: string) => {
  const response = await authClient.signIn.email({
    email,
    password,
    callbackURL: "/dashboard",
  });
  console.log("response from email signin", response);
  return response;
};
// end ------------------------------ email signin ------------------------------

// start ------------------------------ email signup ------------------------------
export const betterAuthSignUp = async (name: string, email: string, password: string) => {
  const response = await authClient.signUp.email({
    name,
    email,
    password,
    callbackURL: "/dashboard",
  });
  console.log("response from email signup", response);
  return response;
};
// end ------------------------------ email signup ------------------------------

// start ------------------------------ get session ------------------------------
export const getSession = async () => {
  const session = await authClient.getSession();
  return session;
};
// end ------------------------------ get session ------------------------------

// start ------------------------------ signout ------------------------------
export const useBetterAuthSignout = () => {
  const router = useRouter();

  const signout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          console.log("signout success");
          router.push("/");
        },
        onError: (error) => {
          console.log("signout error", error);
        },
      },
    });
  };

  return signout;
};
// end ------------------------------ signout ------------------------------

// // schemas
// import { z } from "zod";

// export const signupPayloadSchema = z.object({
//   name: z.string().min(1),
//   email: z.string().email(),
//   password: z
//     .string()
//     .min(8)
//     .max(20)
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
//     )
//     .refine(
//       (password) =>
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
//           password
//         ),
//       {
//         message:
//           "Password must be between 8 and 20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//       }
//     ),
//   confirmPassword: z
//     .string()
//     .min(8)
//     .max(20)
//     .regex(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
//     ),
//   role: z.enum(["creator", "user"]).optional(),
//   image: z.string().url(),
// });

// export const signinPayloadSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
//   role: z.enum(["creator", "user"]).optional(),
// });
