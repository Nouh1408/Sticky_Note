import  jwt  from "jsonwebtoken"
import { User } from "../../../db/model/user.model.js"
import {Note} from '../../../db/model/notes.model.js'

export const addNote = async (req,res,next)=>{
    try {
        const {title,content, userId}= req.body
        const{authorization} = req.headers
        const decoded = jwt.verify(authorization,"usertoken")
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(userId !== decoded.id){
            return res.status(409).json({message:"user can't add note"})
        }
        const note = await Note.create({title,content,userId})
        return res.status(201).json({message:"cote created", note} )
        
    } catch (error) {
        return res.status(500).json({message:"server error", error, message:error.message})
    }
}

export const updateNote = async (req,res,next)=>{
    try {
       
        const{authorization} = req.headers
        const decoded = jwt.verify(authorization,"usertoken")
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const {noteId} = req.params
        const note = await Note.findById(noteId)

        if(!noteId){
            return res.status(404).json({message:"note not found"})
        }
        if(note.userId.toString() !== decoded.id){
            return res.status(404).json({message:"not note owner"})
        }
        const updatedNote = await Note.findByIdAndUpdate(noteId,{...req.body}, {new:true})
        
        return res.status(201).json({message:"note updated", updatedNote} )
        
    } catch (error) {
        return res.status(500).json({message:"server error", error, message:error.message})
    }
}
export const replacenote = async (req,res,next)=>{
    try {
       
        const{authorization} = req.headers
        const decoded = jwt.verify(authorization,"usertoken")
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const {noteId} = req.params
        const note = await Note.findById(noteId)

        if(!note){
            return res.status(404).json({message:"note not found"})
        }
        if(!note.userId ){
            return res.status(400).json({message:"note not have userIf"})
        }
        if(note.userId.toString() !== decoded.id){
            return res.status(404).json({message:"not note owner"})
        }
        const newnote = await Note.replaceOne({_id : noteId}, {...req.body}, {new:true})
        
        return res.status(201).json({message:"note updated", updatedNote: newnote} )
        
    } catch (error) {
        return res.status(500).json({message:"server error", error, message:error.message})
    }
}
export const updateAllNote = async (req,res,next)=>{
    try {
       
        const{authorization} = req.headers
        const decoded = jwt.verify(authorization,"usertoken")
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const {title}= req.body
        if(!title){
            throw new Error("title is required", 400)
        }
        const note = await Note.findById(noteId)

        if(!note){
            return res.status(404).json({message:"note not found"})
        }
        if(!note.userId ){
            return res.status(400).json({message:"note not have userIf"})
        }
        if(note.userId.toString() !== decoded.id){
            return res.status(404).json({message:"not note owner"})
        }
        const newnote = await Note.replaceOne({_id : noteId}, {...req.body}, {new:true})
        
        return res.status(201).json({message:"note updated", updatedNote: newnote} )
        
    } catch (error) {
        return res.status(500).json({message:"server error", error, message:error.message})
    }
}