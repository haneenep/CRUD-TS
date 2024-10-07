import express, { Router } from "express";
import { getNotes,addNotes,editNotes,deleteNote } from "../controller/noteController";

const noteRouter: Router = express.Router();

// getting all notes
noteRouter.get("/", getNotes);

// adding notes
noteRouter.post('/addNotes',addNotes);

// editing notes
noteRouter.put('/editNotes/:id',editNotes);

// deleting notes
noteRouter.delete('/deleteNote/:id',deleteNote);

export default noteRouter;