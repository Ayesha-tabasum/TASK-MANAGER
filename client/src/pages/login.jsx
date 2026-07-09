import { useState } from "react";
import { loginUser } from "../services/authServices";
import { useNavigate } from 'react-router-dom'

function Login(){
    const navigate=useNavigate();
     const[form,setForm]=useState({email: "", password: ""});
     const submitHandler=async (e) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
    alert("All fields are required");
    return;
  }
        let data=await loginUser(form);
        
        localStorage.setItem("token" , data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        navigate("/dashboard");
     };
     return(
        <form  className="auth-form" onSubmit={submitHandler}>
            <h2>Login Form</h2>
    <input type="email" placeholder="Enter email" onChange={(e)=>setForm({...form,
        email:e.target.value})}/>
    <input type="password" placeholder="Enter password" onChange={(e)=>setForm({...form,password: e.target.value})}/>
    <button type="submit">LOGIN</button>
        </form>
     )

}
export default Login;