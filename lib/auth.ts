import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { dash } from "@better-auth/infra";

// Validate required environment variables
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "BETTER_AUTH_URL",
  "ba_e4de5f19292d4281b963a07d1b961534",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
  }
}

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const auth = betterAuth({
  database: { dialect: pool, type: "mysql" },
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [dash()],
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_API_KEY!,
});
