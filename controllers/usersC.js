const User = require("../models/users");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  const user = await User.find({}).populate("blogs");
  res.status(200).json(user);
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

userRouter.post("/", async (req, res) => {
  const Body = req.body;
  const passwordHash = await bcrypt.hash(Body.password, 10);

  if (Body.username.length < 3 || Body.password.length < 3) {
    return res.status(400).json({ error: "username or password is too short" });
  }

  const newUser = new User({
    username: Body.username,
    name: Body.name,
    passwordHash,
  });

  const user = await newUser.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const Token = jwt.sign(userForToken, process.env.SECRET);

  res
    .status(201)
    .json({ Token, username: user.username, name: user.name, id: user._id });
});

userRouter.put("/:id", async (req, res) => {
  const Body = req.body;

  for (var k in Body) {
    if (Body[k] < 5) {
      return res
        .status(406)
        .json({ error: "username or password is too short" });
    }
  }
  if (Body.password) {
    const passwordHash = await bcrypt.hash(Body.password, 10);
    const user = { ...Body, passwordHash };
    const newUser = await User.findByIdAndUpdate(req.params.id, user);
    res.status(201).json(newUser);
  } else {
    const newUser = await User.findByIdAndUpdate(req.params.id, Body);
    res.status(201).json(newUser);
  }
});

module.exports = userRouter;
