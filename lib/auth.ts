import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { dash } from "@better-auth/infra";

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const auth = betterAuth({
  database: { dialect: pool, type: "mysql" },
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [dash()],
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_API_KEY,
});
