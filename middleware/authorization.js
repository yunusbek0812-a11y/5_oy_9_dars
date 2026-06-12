const jwt = require("jsonwebtoken")
const CustomErrorHandler = require("../error/error")

module.exports = function authorization ( req,res,next) {
  try{
    const token = req.headers.authorization

    if(!token) {
      throw CustomErrorHandler.badRequest("Token not found")
    }

    const bearer = token.split(" ")[0]
    const partOfToken = token.split(" ")[1]

    if(bearer !== "Bearer" || !partOfToken) {
     throw CustomErrorHandler.badRequest("Bearer not found")
    }
    next()
    const decode = jwt.verify(partOfToken,process.env.JWT_SECRET)
  }catch(error){
    next(error)
  }
}
