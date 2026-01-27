

// //server/src/utils/response

// export const sendResponse = (res, statusCode, message, data = null) => {
//   const response = {
//     success: statusCode < 400,
//     message,
//     ...(data && { data }),
//   }

//   return res.status(statusCode).json(response)
// }
// export const successResponse = (res, data, message = "Success", status = 200) => {
//   return res.status(status).json({ success: true, message, data });
// };






export const sendResponse = (res, statusCode, message, data = null, meta = null) => {
  const isSuccess = statusCode < 400;

  const response = {
    success: isSuccess,
    message,
    ...(data && { data }),
    ...(meta && { meta }),
  };

  return res.status(statusCode).json(response);
};

export const successResponse = (res, data, message = "Success", statusCode = 200, meta = null) => {
  return sendResponse(res, statusCode, message, data, meta);
};

export const errorResponse = (res, message = "Error", statusCode = 500) => {
  return sendResponse(res, statusCode, message);
};
