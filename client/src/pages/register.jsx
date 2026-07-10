import { useState } from "react";
import { registerUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register(){
            const navigate = useNavigate();
           const [form,setForm]=useState({name: "",email: "",password: ""});
           const submitHandler=async(e)=>{
            e.preventDefault();

                    if (!form.name || !form.email || !form.password) {
    toast.warning("All fields are required");
    return;
  }
  
            try{
                 await registerUser(form);
            toast.success("User Registered successfully ");
            navigate("/login");
            }catch(error){
                  toast.error(error.response?.data?.message || "Something went wrong");;
            }
            
            
           };

           return(
            <form  className="auth-form" onSubmit={submitHandler}>
                <h2>Register Form</h2>
                <input type="text"placeholder="Enter name" onChange={(e)=>setForm({...form,name: e.target.value})}/>
                <input type="email" placeholder="Enter email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
                <input type="password" placeholder="Enter password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
                <button type="submit">REGISTER</button>
            </form>
           )
}


export default Register;