import express from "express";
import { body } from "express-validator";

import {
  signup,
  signin,
  logout,
  activate,
  refresh,
  getGoogleToken,
  refreshGoogle,
} from "../controllers/user.js";

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 16 }),
  signup
);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/activate/:link", activate);
router.get("/refresh", refresh);
router.post("/auth/google", getGoogleToken);
router.get("/auth/google/refresh", refreshGoogle);

export default router;
