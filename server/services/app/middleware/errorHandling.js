const errorHandling = async (err, req, res, next) => {
  console.log("ERRORHANDLINGGGGGG", err);
  switch (err.name) {
    case "SequelizeValidationError":
      const sequelizeError = err.errors.map((el) => el.message);
      res.status(400).json({
        statusCode: 400,
        message: sequelizeError,
      });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({
        message: "Email already used",
      });
      break;
    case "loginError":
      res.status(401).json({
        message: "Invalid email or password",
      });
      break;
    case "unauthenticated":
      res.status(401).json({
        statusCode: 401,
        message: "Error authentication",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({
        statusCode: 401,
        message: "Error authentication",
      });
      break;
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
