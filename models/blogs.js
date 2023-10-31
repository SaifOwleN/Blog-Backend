const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: String,
      required: true,
    },
  ],
  date: { type: String },
  img: { type: String },
  user: mongoose.Schema.Types.ObjectId,
});

blogSchema.set("toJSON", {
  transform: (document, ob) => {
    ob.id = ob._id.toString();
    if (ob.user) {
      ob.user = ob.user.toString();
    }
    delete ob._id;
    delete ob.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
