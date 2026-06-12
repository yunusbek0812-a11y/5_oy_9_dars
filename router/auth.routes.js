const { Router } = require("express");
const { register, login, getMe, getProfile, forgotPassword, changePassword } = require("../controller/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validator/auth.validator");
const auth = require("../middleware/auth.middleware");
const authorization = require("../middleware/authorization");

const authRouter = Router();

// Inline validator middleware'lar
const checkRegister = (req, res, next) => {
  const error = registerValidator(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation xatosi", error: error.details[0].message });
  }
  next();
};

const checkLogin = (req, res, next) => {
  const error = loginValidator(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation xatosi", error: error.details[0].message });
  }
  next();
};

authRouter.post("/register", checkRegister, register);
authRouter.post("/login", checkLogin, login);
authRouter.get("/me", auth, getMe);
authRouter.post("/forgot_password",forgotPassword)
authRouter.post("/change_password",authorization,changePassword)
authRouter.get("/profile", authorization, getProfile)

module.exports = authRouter;
