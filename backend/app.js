// app.js
import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/dbconfig.js';
import userRoutes from './routes/userRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectdb();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("helloworld")
})
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
