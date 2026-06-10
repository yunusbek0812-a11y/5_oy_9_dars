require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.config");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const errorMiddleware = require("./middleware/error.middleware");
const cookieParser = require("cookie-parser");
const CitationRouter = require("./router/citation.routes");
const logger = require("./utils/logger");
const authSchema = require("./schema/auth.schema");


const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}))

logger.warn("Warn logger")
logger.error("Error logger")
logger.info("Info logger") 
logger.debug("Debug logger") 

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads/images")));

app.use(authorRouter);
app.use(bookRouter);
app.use(CitationRouter);
app.use(errorMiddleware);
app.use(authSchema)

app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});