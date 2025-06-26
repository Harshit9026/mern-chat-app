import express from 'express'
import authRoutes from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { connectdb } from './lib/db.js';
import messageRoutes from './models/message.model.js';
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT  // fallback if env not set

app.use(express.json());   
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);            // ✅ Middleware first
app.use('/api/auth', authRoutes);   
app.use("/api/messages", messageRoutes);   // ✅ Then routes

app.get('/', (req,res)=>{
    res.send("Server is running");
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
    connectdb();
});

