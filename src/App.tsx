import './App.css'
import { Routes, Route, useNavigate } from "react-router-dom"
// import { Container } from 'react-bootstrap'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'
import AdminLayout from './components/AdminLayout'
import AdminHome from './pages/admin/AdminHome'
import HomeLayout from './components/HomeLayout'
import CreateShelter from './pages/shelter/CreateShelter'
import ShelterHome from './pages/shelter/ShelterHome'
import ShelterLayout from './components/ShelterLayout'
import CreateCatogories from './pages/admin/CreateCatogories'
import SearchPage from './pages/SearchPage'
import DetailAnimal from './pages/DetailAnimal'

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
      {/* <Route path='/' element={<Home />}></Route> */}
      <Route path="/" element={<HomeLayout />}>
        <Route path="" element={<Home />}/>
        <Route path="/create-shelter" element={<CreateShelter />}/>
        <Route path="search-animal" element={<SearchPage />}/>
        <Route path="detail-animal/:id" element={<DetailAnimal />}/>
        {/* <Route path="tasks" element={<DashboardTasks />} /> */}
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<AdminHome />} />
        <Route path="category" element={<CreateCatogories />} />
      </Route>
      <Route path="/shelter" element={<ShelterLayout />}>
        <Route path="home" element={<ShelterHome />} />
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  )
}

export default App
