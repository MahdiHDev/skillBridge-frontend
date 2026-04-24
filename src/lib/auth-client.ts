import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
    baseURL: process.env.AUTH_URL,
    // baseURL: "http://localhost:5000/",
});
