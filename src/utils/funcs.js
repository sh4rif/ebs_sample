export const errResponse = (errors = [], status = 400) => {
  return { success: false, user: null, status: status, errors };
};

export const successResponse = (data = null, status = 200, success = true) => {
  return { success: success, data, status: status, errors: [] };
};

// export const response = (msg = "", status = 400, errors = []) => {
//   return { success: false, user: null, status: status, errors };
// };
