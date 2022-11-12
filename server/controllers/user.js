import { validationResult } from "express-validator";
import UserService from "../service/user.js";
import ApiError from "../exceptions/apiError.js";
import { OAuth2Client, UserRefreshClient } from "google-auth-library";

export const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error", errors.array()));
    }
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const userData = await UserService.signup(
      email,
      password,
      confirmPassword,
      firstName,
      lastName
    );
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    }); // 30 дней в мс, httpOnly очень важно, чтобы в браузере нельзя было её изменять
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

export const activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link;
    await UserService.activation(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
    next(e);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await UserService.signin(email, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await UserService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token); //можно просто статус 200
  } catch (e) {
    next(e);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await UserService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};

export const getGoogleToken = async (req, res, next) => {
  try {
    const code = req.body.code;
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "postmessage"
    );
    const { tokens } = await oAuth2Client.getToken(code); // exchange code for tokens
    res.cookie("refreshToken", tokens.refresh_token, {
      httpOnly: true,
    });
    return res.json(tokens);
  } catch (e) {
    next(e);
  }
};

export const refreshGoogle = async (req, res, next) => {
  try {
    const user = new UserRefreshClient(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      req.cookies.refreshToken
    );
    const { credentials } = await user.refreshAccessToken();
    return res.json(credentials);
  } catch (e) {
    next(e);
  }
};

// const generateJwt = (_id, email) => {
// 	return jwt.sign({ id: _id, email }, process.env.SECRET_KEY, {
// 		expiresIn: '1h',
// 	})
// }

// export const signin = async (req, res) => {
//   const {email, password} = req.body;

//   try {
//     const existingUser = await User.findOne({email});
//     if (!existingUser) return res.status(404).json({message: "User doesn't exist"});
//     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//     if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});
//     const token = generateJwt(existingUser._id, existingUser.email)
//     res.status(200).json({result: existingUser, token});
//   } catch (e) {
//     res.status(500).json({message: "Something went wrong"})
//   }
// }

// export const signup = async (req, res) => {
//   const {email, password, confirmPassword, firstName, lastName} = req.body;
//   try {
//     const existingUser = await User.findOne({email});
//     if (existingUser) return res.status(400).json({ message: "User already exists" });
//     if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
//     const token = generateJwt(result._id, result.email)
//     res.status(200).json({result: result, token});
//   } catch (e) {
//     res.status(500).json({message: "Something went wrong"})
//   }
// }
