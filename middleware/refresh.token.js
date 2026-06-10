const CustomErrorHandler = require("../error/error");
const jwt = require("jsonwebtoken");
const { access_token, refresh_token } = require("../utils/token-generator");

module.exports = function refreshToken(req, res, ) {
  try {
    const token = req.headers.refreshToken;

    if (!token) {
      throw CustomErrorHandler.BadRequest("Token not found");
    }

    const decode = jwt.verify( token , process.env.REFRESH_SEKRET_KEY)

    req.user = decode

    const payload ={
        id: req.user._id,
        email: req.user._email , 
        role : req.user.role 
    }


     const accsess = access_token(payload);
     const refresh = refresh_token(payload);

     res.cookie ("accessToken", accsess, {httpOnly: true, maxAge: 15 * 60 * 1000});
     res.cookie ("refreshToken", refresh, {httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000});

     res.status(200).json({
        massege: "Success"
     });
   
  } catch (error) {
    next(error);
  }
};