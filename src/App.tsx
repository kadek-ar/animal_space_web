import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom"
// import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'
import AdminLayout from './components/AdminLayout'
import AdminHome from './pages/admin/AdminHome'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if(window.location.pathname !== "/login" && window.location.pathname !== "/register"){
      if(!localStorage.getItem('auth')){
        localStorage.clear();
        navigate("/login")
      }
    }
  }, [window.location.pathname])
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="home"
          element={<AdminHome />}
        />
        {/* <Route path="tasks" element={<DashboardTasks />} /> */}
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  )
}

export default App
