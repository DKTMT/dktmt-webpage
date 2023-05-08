import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Overview from './pages/Overview'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import Api from './pages/Api'
import Navbar from './components/Navbar';
import Strategy from './pages/Strategy';
import Task from './pages/Task'
import Blog from './pages/Blog'


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
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api" element={
            <ProtectedRoute user={user}>
              <Api />
            </ProtectedRoute>
          } />
          <Route path="/overview" element={
            <ProtectedRoute user={user}>
              <Overview />
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
          <Route path="/blog" element={
            <ProtectedRoute user={user}>
              <Blog />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
