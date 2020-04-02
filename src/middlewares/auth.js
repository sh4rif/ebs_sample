import { errResponse, isLoggedIn, logout } from "../utils";
import { SESSION_ABSOLUTE_TIMEOUT } from "../../config";

export const guestOnly = (req, res, next) => {
  console.log("middleware running");
  if (isLoggedIn(req)) {
    console.log("user logged in");
    const errors = ["You are already logged in."];
    return res.status(403).json(errResponse(errors, 403));
  }
  console.log("user is not logged in", req.headers.cookie);

  next();
};

export const auth = (req, res, next) => {
  if (!isLoggedIn(req)) {
    const errors = ["You must be logged in to performe this action."];
    return res.status(401).json(errResponse(errors, 401));
  }

  next();
};

export const active = async (req, res, next) => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session;
    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      await logout(req, res);
      return res.json({ message: "Session Expired" });
    }
  }
  next();
};
