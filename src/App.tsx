import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom"
// import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if(window.location.pathname !== "/login" && window.location.pathname !== "/register"){
      if(!localStorage.getItem('auth')){
        navigate("/login")
      }
    }
  }, [window.location.pathname])
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  )
}

export default App
