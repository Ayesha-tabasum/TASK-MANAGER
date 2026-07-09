import api from "./api.js"


//login function
export const loginUser=async (data) => {
  
         const res=await api.post('/auth/login',data)
         return res.data;
    }


    //register function

    export const registerUser=async(data)=>{
        try{
             const res=await api.post("/auth/register",data)
        return res.data
        }catch (error) {
    throw error;
  }
        
    }