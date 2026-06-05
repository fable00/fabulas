import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number().default(587),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_SECURE: z.string().transform((val) => val === 'true').default(false)
});

export function validateEnv(rawEnv: Record<string, string>) {
  const _env = envSchema.safeParse(rawEnv);

  if (!_env.success) {
    console.error("❌ Invalid environment variables:", z.treeifyError(_env.error));
    throw new Error("Invalid environment variables");
  }

  return _env.data;
}
