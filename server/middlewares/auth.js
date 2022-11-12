import ApiError from "../exceptions/apiError.js";
import TokenService from "../service/token.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const isCustomAuth = accessToken.length < 500;

    let userData;

    if (accessToken && isCustomAuth) {
      userData = TokenService.validateAccessToken(accessToken); // user token
      req.userId = userData.id;
    }

    if (accessToken && !isCustomAuth) {
      userData = jwt.decode(accessToken); // google token
      req.userId = userData.sub;
    }

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};

export default authMiddleware;
