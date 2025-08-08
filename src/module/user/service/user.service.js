import jwt from "jsonwebtoken"
import { User } from "../../../db/model/user.model.js"
import CryptoJS from "crypto-js"

export const updateUser = async (req, res, next) => {
    try {
        const {authorization}= req.headers
        const decoded = jwt.verify(authorization, "usertoken")
        // console.log(decoded);
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message:"user not found "})
        }
        const updateUser = {...req.body}
        if(updateUser.email && updateUser.email !== user.email){
            
            const isEmailExist = await User.findOne({email:updateUser.email})
            if(isEmailExist){
                return res.status(404).json({message:"email already exist"})
            }
        }
        if(updateUser.password){
            delete updateUser.password
        }
        const {username,email,age} = await User.findByIdAndUpdate(decoded.id, updateUser, {new:true})
        return res.status(200).json({message:"user updated successfully ", updateUser})
    } catch(error){
        return res.status(500).json({message:"server error"})
        
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const {authorization}= req.headers
        const decoded = jwt.verify(authorization, "usertoken")
        // console.log(decoded);
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message:"user not found "})
        }
        
     
        const deletedUser = await User.findByIdAndDelete(decoded.id)

        return res.status(200).json({message:"user deleted successfully ", updateUser})
    } catch(error){
        return res.status(500).json({message:"server error"})
        
    }
}

export const getUserData = async (req, res, next) => {
    try {
        const {authorization}= req.headers
        const decoded = jwt.verify(authorization, "usertoken")
        // console.log(decoded);
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message:"user not found "})
        }
        user.phone = CryptoJS.AES.decrypt(user.phone, "phoneEncryption").toString(CryptoJS.enc.Utf8)
        
        return res.status(200).json({message:"user information ", user})
    } catch(error){
        return res.status(500).json({message:"server error"})
        
    }
}