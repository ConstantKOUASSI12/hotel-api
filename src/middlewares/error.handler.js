export const errorHandler = (err, req, res, next) => {
  //console.error("Error:", err.message);
  console.error("Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    data: err.data || null,
  });
};
