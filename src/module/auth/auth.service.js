import { User } from "../../db/model/user.model.js";
import * as bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, phone, age } = req.body;
    //check existence
    const userExist = await User.findOne({ email });
    if (userExist) {
      // throw new Error("User already exist", {message:"User already exist", cause: 409 });
      return res.status(409).json({
        message: "User already exist",
        success: false,
      });
    }
    //haspPass
    const hashPaswword = bcrypt.hashSync(password, 10);
    //encrypt phone
    const encryptPhone = CryptoJS.AES.encrypt(phone, "phoneEncryption");

    //createuser
    const { _id } = await User.create({
      name,
      email,
      password: hashPaswword,
      phone: encryptPhone,
      age,
    });
    return res
      .status(201)
      .json({ message: " user created", user: { _id, name } });
  } catch (error) {
    return res.status(error.cause || 500).json({
      message: error.cause,
      success: false,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if(!isPasswordValid){
        return res.status(404).json({
          message : "invalid ",
        })
      }

    const token = jwt.sign({id:user._id},"usertoken", {expiresIn:60*60})

      return res
        .status(201)
        .json({ message: " user created",token });
    }
   catch (error) {
    return res.status(error.cause || 500).json({
      message: error.cause,
      success: false,
    });
  }
}

