const { Router } = require("express");
const authorization = require("../middleware/authorization");
const { like } = require("../controller/like.controller");

const likeRouter = Router();

likeRouter.patch("/like/:id" , authorization,like)


module.exports = likeRouter;