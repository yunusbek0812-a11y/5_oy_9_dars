const jwt = require("jsonwebtoken");
const User = require("../schema/user.schema");
const CustomErrorHandler = require("../error/error");

// REGISTER
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw CustomErrorHandler.alreadyExists("Foydalanuvchi allaqachon mavjud");
    }

    const user = await User.create({ username, email, password });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "Foydalanuvchi muvaffaqiyatli yaratildi",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      throw CustomErrorHandler.notFound("Foydalanuvchi topilmadi");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw CustomErrorHandler.unauthorized("Parol noto'g'ri");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Tizimga muvaffaqiyatli kirdingiz",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET ME
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw CustomErrorHandler.notFound("Foydalanuvchi topilmadi");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const foundedUser = await AuthSchema.findOne({ _id: req.user.id }).select(
      "-password",
    );

    res.status(200).json(foundedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const foundeduser = await AuthSchema.findOne({ email });

    if (foundeduser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    const randomCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 9),
    ).join("");

    const dateNow = Date.now() + 120000;

    await sendEmail(email, randomCode);

    await AuthSchema.findByIdAndUpdate(foundeduser._id, {
      otp: randomCode,
      otpTime: dateNow,
    });

    res.status(200).json({
      message: "Please check your email",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { new_password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email: req.user.email });

    const hashPassword = await bcrypt.hash(new_password, 12);

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      password: hashPassword,
    });

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  getProfile,
  forgotPassword,
  changePassword,
};
