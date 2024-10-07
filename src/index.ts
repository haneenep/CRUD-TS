import { configDotenv } from "dotenv";
import express  from "express";
import mongoose from "mongoose";
import path from "path";
import noteRouter from "./router/noteRouter";
configDotenv()

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set("views",path.join(__dirname,'views'));
app.set("view engine","ejs");
app.use('/',express.static(path.join(__dirname,'/src/view')))

app.use("/",noteRouter)

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'

mongoose.connect(MONGO_URL,{
    dbName : 'crud-using-ts'
}).then(() => {
    console.log("successfully connected to db");
}).catch((err) => {
    console.log("Error while connecting to db",err);    
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log(`server is started on PORT : http://localhost:${PORT}`); 
});
