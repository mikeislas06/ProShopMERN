const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // Create a new error object
  res.status(404); // Set the status code to 404
  next(error); // Pass the error to the next middleware
};

const errorHandler = (err, req, res, next) => {
  // Set the status code to 500 if the status code is 200
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  }); // Set the status code to statusCode
};

export { notFound, errorHandler };
