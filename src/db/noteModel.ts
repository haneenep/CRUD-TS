import { model,Schema, Types } from "mongoose";

interface Type{
    id ?: Types.ObjectId;
    title : string;
    content : string;
}

const noteSchema = new Schema<Type>(
    {
        title : {
            type : String,
            required : true
        },
        content : {
            type : String,
            required : true
        },
    },
    {
        timestamps : true
    }
)

const Note = model<Type>('Note',noteSchema)
export {Note}