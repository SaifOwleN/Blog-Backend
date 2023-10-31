const { transform } = require("lodash");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  img: {
    type: String,
    default:
      "https://i1.sndcdn.com/artworks-F5Xi4VpG6oW5Ce4G-zCBV3w-t500x500.jpg",
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj.passwordHash;
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model("User", userSchema);
