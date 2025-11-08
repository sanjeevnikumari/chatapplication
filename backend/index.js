// import express from "express"
// import  dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import userRoute from "./routers/userRoute.js"
// import cookieParser from "cookie-parser";
// import messageRoute from "./routers/messageRoute.js"
// import cors from "cors"



// dotenv.config({});

// const app=express()
// app.use(express.urlencoded({extended:true}))
// app.use(express.json());
// app.use(cookieParser()); 
// const corsOption={
//     origin:'http://localhost:3000',
//     credentials:true
// };
// app.use(cors(corsOption));          




// const PORT=process.env.PORT||5000

// app.use("/api/v1/user",userRoute)
// app.use("/api/v1/message",messageRoute)

// app.listen(PORT,()=>{
//     connectDB()
//     console.log(`server is ruuning at${PORT}`);
// })
import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routers/userRoute.js";
import messageRoute from "./routers/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// ✅ import the already initialized app & server (with socket.io)
import { app, server } from "./socket/socket.js";

dotenv.config();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

const PORT = process.env.PORT || 8000;

// ✅ Start the *shared* HTTP + WebSocket server
server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server is running at ${PORT}`);
});
