import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/task",taskRoutes);
app.get("/test", (req, res) => res.send("alive"));


const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running at ${PORT}`);
        console.log("mongodb connected");
    })
}
   

).catch((error)=>{
 console.log(error)
}
)