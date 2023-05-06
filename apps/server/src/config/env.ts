import { z } from 'zod';

import { config } from 'dotenv';

config();

// Create the env schema
const envSchema = z.object({
  PORT: z.string().transform((port) => Number(port)),
  NODE_ENV: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const errors = result.error.issues.map(
    (issue) => `The env variable ${issue.path[0]} is not correct. Error message: ${issue.message}`
  );

  console.error('ENV ERRORS', errors);
  throw new Error(`Env validation failed`);
}

export const env = result.data;