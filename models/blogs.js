const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: String,
      required: true,
    },
  ],
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        minlength: [3, "string too short"],
        required: true,
        maxlength: 400,
      },
      likes: [
        {
          type: String,
          required: true,
        },
      ],
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
