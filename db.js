import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useFindAndModify : false
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ mongoDB is ready!");
const handleError = (error) => console.log(`❌ I'm sorry you have an error kind of : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);