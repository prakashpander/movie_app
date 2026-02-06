import React from 'react'
import UserLogin from './pages/UserLogin.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserSignup from './pages/UserSignup.jsx';
import Navbar from './pages/Navbar.jsx';
import AdminSignup from './pages/AdminSignup.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import UserPage from './pages/UserPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AddMovie from './pages/AddMovie.jsx';
import UpdateMovie from './pages/UpdateMovie.jsx';
import { ToastContainer } from 'react-toastify';
import AdminProtectedPage from './pages/AdminProtectedPage.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/admin' element={<AdminProtectedPage><AdminPage /></AdminProtectedPage>} />
        <Route path='/addmovie' element={<AdminProtectedPage><AddMovie /></AdminProtectedPage>} />
        <Route path='/updatemovie/:id' element={<AdminProtectedPage><UpdateMovie /></AdminProtectedPage>} />
        <Route path='/adminsignup' element={<AdminProtectedPage><AdminSignup /></AdminProtectedPage>} />
        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/userlogin' element={<UserLogin />} />
        <Route path='/usersignup' element={<UserSignup />} />
      </Routes>

      <ToastContainer position='top-center' />
    </Router>
  )
}

export default App