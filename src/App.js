import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CoinSelect from './pages/CoinSelect'
import Api from './pages/Api'
import Navbar from './components/Navbar';


function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={ <Login /> }/>
        <Route path="/register" element={ <Register /> }/>
        <Route path="/select" element={ <CoinSelect /> }/>
        <Route path="/api" element={ <Api /> }/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
 