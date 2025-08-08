import { Schema } from "mongoose";
import mongoose from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength:2
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be at least 18"],
    max: [60, "Age must be at most 60"],
  },
},{
  
});
export const User = mongoose.model("User", schema)