import mongoose, { model, Schema } from "mongoose";
export const connectionDB = async ()=> {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Sticky_Notes")
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log("failed to connect to database", err.message);
    });
    
}
