import "dotenv/config";
export const { NODE_ENV = "development", APP_PORT = 5000 } = process.env;

export const env = process.env.NODE_ENV || "development";

export const IN_PROD = NODE_ENV === "production";

export const BCRYPT_WORK_FACTOR = 12;
export const BCRYPT_MAX_BYTES = 72;
