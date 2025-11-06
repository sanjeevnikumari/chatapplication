import express from "express"
import  dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routers/userRoute.js"
import cookieParser from "cookie-parser";
import messageRoute from "./routers/messageRoute.js"

dotenv.config({});

const app=express()
app.use(express.json());
app.use(cookieParser());          // ✅ to parse cookies




const PORT=process.env.PORT||5000

app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`server is ruuning at${PORT}`);
})