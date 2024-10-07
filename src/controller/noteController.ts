import { Request,Response } from "express";
import { Note } from "../db/noteModel";


export const getNotes = async (req : Request, res : Response) => {
    try{
        const allNotes = await Note.find().sort({createdAt : -1});
         res.render('notes',{allNotes})
    } catch (err){
         res.status(400).json({err})
    }
}

export const addNotes = async (req : Request , res : Response) => {
    try{
        const {title,content} = req.body;
        const newNote = new Note({title,content});
        await newNote.save();
        res.status(201).json(newNote);
    } catch(err){
        console.log(err);
        
        res.status(400).json({err});
    }
}

export const editNotes = async (req : Request , res : Response) => {
    try{
        const {id} = req.params;
        const {title,content} = req.body;
        
        const updatedNote = await Note.findByIdAndUpdate(id,
                {title,content},
                {new : true}
            );

        if(!updatedNote){
            res.status(404).json({error : 'note not found'});
            return;
        }

        res.status(200).json(updatedNote);

    } catch(err){
        res.status(400).json({err})
    }
}

export const deleteNote = async (req : Request , res : Response) => {
    try{
        const {id} = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);

        if(!deletedNote){
            res.status(404).json({error:"note not found"})
            return;
        }

        res.status(200).json({message : "note deleted successfully"});

    }catch(error){
        res.status(400).json({error})
    }
}