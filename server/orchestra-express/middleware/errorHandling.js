const errorHandling = async (err, req, res, next) => {
  switch (err.name) {
    case "productNotFound":
      res.status(404).json({
        message: "Product not found",
      });
      break;
    default:
      res.status(500).json({
        message: "Internal Server Error",
      });
      break;
  }
};

module.exports = errorHandling;
