import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

export const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  } else {
    const extractedError = [];
    error.array().map((error) =>
      extractedError.push({
        [error.path]: error.msg,
      }),
    );
  }

  throw new ApiError(422, "Recieved data is not valid", extractedError);
};
