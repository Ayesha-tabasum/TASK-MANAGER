import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Dashboard from "./pages/dashboard.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Register />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
 
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      </BrowserRouter>
    </>
  )
}

export default App