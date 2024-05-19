import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT),
  HOST: process.env.HOST,
  MONGO_URL: process.env.MONGO_URL,

  HASH_ROUNDS: Number(process.env.HASH_ROUNDS),

  FRONT_URL: process.env.FRONT_URL,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  JWT_ACTION_FORGOT_TOKEN_SECRET: process.env.JWT_ACTION_FORGOT_TOKEN_SECRET,
  JWT_ACTION_FORGOT_EXPIRES_IN: process.env.JWT_ACTION_FORGOT_EXPIRES_IN,
  JWT_ACTION_VERIFY_TOKEN_SECRET: process.env.JWT_ACTION_VERIFY_TOKEN_SECRET,
  JWT_ACTION_VERIFY_EXPIRES_IN: process.env.JWT_ACTION_VERIFY_EXPIRES_IN,

  // SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  // SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,

  NAME_ACCOUNT_GMAIL: process.env.NAME_ACCOUNT_GMAIL,
  PASSWORD_ACCOUNT_GMAIL: process.env.PASSWORD_ACCOUNT_GMAIL,
};
