
import 'antd/dist/antd.min.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/loaders/Loader';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import PublicRoute from './components/publicRoutes/PublicRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './resources/global.css';


const App = () => {

  console.log("I AM RHE APP KING");
  return (
    <div >
      <Loader></Loader>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;
