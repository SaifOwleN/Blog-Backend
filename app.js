const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogsC");
const testingRouter = require("./controllers/testing");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/usersC");

const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

mongoose.connect(config.mongoUrl);

logger.info("connecting to", config.mongoUrl);
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/testing", testingRouter);
module.exports = app;
