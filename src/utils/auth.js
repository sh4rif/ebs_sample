import { SESSION_NAME } from "../../config";

export const isLoggedIn = req => !!req.session.userId;

export const login = (req, userId) => {
  req.session.userId = userId;
  req.session.createdAt = Date.now();
};

export const logout = (req, res) => {
  return new Promise((resolve, reject) => {
    return (
      req.session &&
      req.session.destroy(err => {
        if (err) reject(err);

        res.clearCookie(SESSION_NAME);

        resolve();
      })
    );
  });
};
