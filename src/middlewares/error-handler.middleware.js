import Errors from "../utils/EnumsError.js";

export const errorHandlerMiddleware = (error, req, res, next) => {
  console.error(error.cause || error.message);

  switch (error.code) {
    case Errors.BAD_REQUEST_ERROR:
    case Errors.INVALID_PARAMS_ERROR:
      res.status(400).json({ status: "error", message: error.message });
      break;
    case Errors.DATA_BASE_ERROR:
    case Errors.ROUTING_ERROR:
    default:
      res.status(500).json({ status: "error", message: error.message });
  }
};
