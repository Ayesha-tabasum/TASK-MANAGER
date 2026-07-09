
import task from "../models/task.js";
import Task  from "../models/task.js";


//create task
export const createTask=async (req,res) => {
    try{
      const task=await Task.create({
         ...req.body,
         user: req.user,
      })
       res.status(200).json({
        message: "task added successfully! "
    });
    }
    catch(error){
            res.status(500).json({ message: error.message });
    }
}


//get task

export const getTask=async (req,res) => {
    try{
        const page=Number(req.query.page) ||1;
        const limit=Number(req.query.limit) || 10;
        const skip=(page-1)*limit;

        const totalTask=await Task.countDocuments({user: req.user});
        const tasks=await Task.find({user: req.user}).sort({createdAt: -1}).skip(skip).limit(limit);

        res.status(200).json({
          totalTask,
          currentPage : page,
          totalPages : Math.ceil(totalTask/limit),
          tasks,
        })
    
    }catch(error){
       res.status(500).json({ message: error.message });
    }
}



//edit task

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user,
      },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//delete task

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


//SEARCH  API

export const searchTask=async(req,res)=>{
    try{
         const keyword=req.query.keyword;
     let task=await Task.find({
            user: req.user,
              title :{
         $regex : keyword,
             $options : "i"
        }
    
 });
 res.status(200).json(task)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    } 
}



//FILTER API

export const filterTask=async (req,res) => {try {
    const {priority}=req.query;
    let task=await Task.find({
        priority: priority,
        user: req.user
    });
    res.status(200).json(task);
} catch (error) {
    res.status(500).json({
        message: error.message ,

    })
}}

//get profile
export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};