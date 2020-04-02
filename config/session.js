import { IN_PROD } from "./";

const HALF_HOUR = 1000 * 60 * 30;
export const {
  SESSION_SECRET = `please keep this a secret with some random garbeg as;dfhasdfhsad;kf`,
  SESSION_NAME = "SID",
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
  SESSION_LIFETIME = 640000
} = process.env;

export const SESSION_OPTIONS = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: false,
    httpOnly: false
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
};
