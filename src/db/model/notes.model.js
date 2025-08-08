import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      validate: {
      validator: function(t) {
        return t !== t.toUpperCase();
      },
      message: "Title must not be in uppercase"
    },
  },
    content: {
      type: String,
      required: [true, "Content is required"]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },{
    timestamps: true,
  }
);

export const Note = mongoose.model("Note", noteSchema);
