import express from "express"
import { createTask,updateTask,getTask,deleteTask ,getProfile} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { searchTask ,filterTask} from "../controllers/taskController.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router=express.Router();
router.post("/",protect,createTask);
router.get("/",protect, getTask);
router.put("/:id", protect,updateTask);
router.delete("/:id",protect,deleteTask);
router.get("/search",protect,searchTask);
router.get("/filter",protect,filterTask);
router.get("/profile",protect,authorize("user","admin"),getProfile)

export default router;
