import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CoinSelect from './pages/CoinSelect'
import Api from './pages/Api'
import Navbar from './components/Navbar';
import Strategy from './pages/Strategy';
import Task from './pages/Task'


function App() {

  let user

  const ProtectedRoute = ({ children }) => {
    user = localStorage.getItem('user')
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api" element={
            <ProtectedRoute user={user}>
              <Api />
            </ProtectedRoute>

          } />
          <Route path="/" element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>

          } />
          <Route path="/strategy" element={
            <ProtectedRoute user={user}>
              <Strategy />
            </ProtectedRoute>

          } />
          <Route path="/ticket" element={
            <ProtectedRoute user={user}>
              <Task />
            </ProtectedRoute>

          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
